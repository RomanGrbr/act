import json
import os

from flask import jsonify, request

from app.error_handlers import Invalid_API_usage
from app import app


FILE_NAME = 'data.json'
FILE_DIR = os.path.join(os.path.dirname(__file__), FILE_NAME)

with open(FILE_DIR) as file:
    data = json.load(file)


@app.route('/data', methods=['GET'])
def get_data():
    """Полуяение данных с учетом заданных параметров."""
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    sort_by = request.args.get('sort_by', 'id')
    sort_order = request.args.get('sort_order', 'asc')
    filter_term = request.args.get('filter', '')

    # Фильтрация
    filtered_data = [item for item in data if filter_term.lower() in item['description'].lower()]

    # Сортировка
    reverse = (sort_order == 'desc')
    filtered_data.sort(key=lambda x: x[sort_by], reverse=reverse)

    # Пагинация
    start = (page - 1) * per_page
    end = start + per_page
    paginated_data = filtered_data[start:end]

    response = {
        'data': paginated_data,
        'total': len(filtered_data)
    }
    return jsonify(response)


@app.route('/data/<int:item_id>', methods=['DELETE'])
def delete_data(item_id: int):
    """Удаление данных."""
    global data
    data_items = {item['id']: item for item in data}
    if item_id not in data_items:
        raise Invalid_API_usage(f'Запись с id={item_id} отсутствует!')
    data = [item for item in data if item['id'] != item_id]
    with open(FILE_DIR, 'w') as file:
        json.dump(data, file)
    return jsonify({'success': True})


@app.route('/data', methods=['POST'])
def add_data():
    """Добавление данных."""
    global data
    new_item = request.json
    data.append(new_item)
    with open(FILE_DIR, 'w') as file:
        json.dump(data, file)
    return jsonify(new_item), 201
