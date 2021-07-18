from re import S
from quart import Quart, jsonify, request
from dotenv import load_dotenv, find_dotenv
from quart_cors import cors
import httpx
import asyncio
import os
from bs4 import BeautifulSoup

app = Quart(__name__)
app = cors(app, allow_origin="*")
load_dotenv(find_dotenv())

URL = 'http://consulta.siiau.udg.mx/wco/sspseca.consulta_oferta'


def parseHTML(html):

    soup = BeautifulSoup(html, 'html.parser')

    main_table = soup.find_all('table')[0]
    secciones = main_table.findChildren('tr', recursive=False)[2:]

    data = []
    for seccion in secciones:
        info = seccion.findChildren('td', recursive=False)
        nrc = info[0].getText()
        clave = info[1].getText()
        nombre = info[2].getText()
        seccion = info[3].getText()
        creditos = info[4].getText()

        cupos = info[5].getText()
        disponibles = info[6].getText()

        horario = info[7].findChildren('tr')


        horarios = []
        for clase in horario:
            dia = clase.findChildren('td')

            sesion = dia[0].getText()

            horas = dia[1].getText().split('-')

            diasemana = dia[2].getText()

            semana = []
            if(diasemana[0] == 'L'):
                semana.append('Lunes')
            if(diasemana[2] == 'M'):
                semana.append('Martes')
            if(diasemana[4] == 'I'):
                semana.append('Miercoles')
            if(diasemana[6] == 'J'):
                semana.append('Jueves')
            if(diasemana[8] == 'V'):
                semana.append('Viernes')
            if(diasemana[10] == 'S'):
                semana.append('Sabado')

            edificio = dia[3].getText()
            aula = dia[4].getText()
            periodo = dia[5].getText()

            horarios.append(
                {
                    'sesion': sesion, 
                    'entrada': 
                        round(float(horas[0][:2] + '.' + horas[0][2:])), 
                    'salida': 
                        round(float(horas[1][:2] + '.' + horas[1][2:])), 
                    'dias': semana, 
                    'edificio': edificio, 
                    'aula': aula, 
                    'periodo': periodo
                }
            )

        profesor = info[8].findChildren('td')[1].getText()

        data.append({
            'activo': True,
            'nrc' : nrc,
            'clave' : clave, 
            'nombre' : nombre, 
            'seccion' : seccion,
            'creditos' : int(creditos),
            'cupos' : int(cupos),
            'disponibles': int(disponibles),
            'profesor': profesor,
            'horas': horarios,
        })

    return data

async def get_bulk_data(info):

    async with httpx.AsyncClient() as client:
        
        tasks = (client.post(URL, data={
                "ciclop": info['ciclo'],
                "cup": info['centro'],
                "majrp": '',
                "crsep": data.upper(),

                "horaip": '',
                "materiap": '',
                "horafp": '',
                "edifp": '',
                "aulap": '',
                "ordenp": '0',
                "mostrarp": '100',
            }) for data in info['materias'])

        reqs = await asyncio.gather(*tasks)

    responses = [r.text for r in reqs]
    
    results = []
    
    for data in responses:
        
        res = parseHTML(data)
        if res:
            results.append({
                'activo': True,
                'clave': res[0]['clave'],
                'nombre': res[0]['nombre'],
                'secciones': res
            })

    return results

INFO_URL = "http://consulta.siiau.udg.mx/wco/sspseca.forma_consulta"

@app.route('/getInfo', methods=['GET'])
async def getInfo():
    r = httpx.get(INFO_URL)

    soup = BeautifulSoup(r.content, 'html.parser')

    tag = soup.find('select', {'name': 'cup'})
    letag = str(tag).split('<option value="')[1:]

    planteles = []

    for x in letag:
        id = x[0]
        name = x[3:].split('</option>')[0].replace("\n", "")
        planteles.append({"id": id, "nombre": name})

    ciclos = []
    tag = soup.find('select', {'name': 'ciclop'})
    letag = str(tag).split('<option value="')[1:]

    for x in letag:
        id = x.split('"')[0]
        name = x.split('"')[1][1:]
        name = name.split('</option')[0].replace("\n", "")
        ciclos.append({"id": id, "nombre": name})

    return jsonify({"planteles": planteles, "ciclos": ciclos[:20]})

@app.route('/getData', methods=['POST'])
async def getData():
    data = await request.get_json()
    info = data['info']
    res = await get_bulk_data(info)
    return jsonify(res)

if __name__ == "__main__":
    if os.environ.get('DEVAREA') == 'True':
        app.run(debug=True, port=5001)