import json
import os
from pathlib import Path
from http import HTTPStatus

from flask import request, jsonify
# from app.error_handlers import Invalid_API_usage
from app import app

FILE_NAME = 'data.json'
FILE_DIR = os.path.join(Path(__file__).resolve().parent, FILE_NAME)

with open(FILE_DIR) as file:
    data = json.load(file)


@app.route('/data', methods=['GET'])
def get_data():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    sort_by = request.args.get('sort_by', 'id')
    sort_order = request.args.get('sort_order', 'asc')
    filter_term = request.args.get('filter', '')

    # Filter data
    filtered_data = [item for item in data if filter_term.lower() in item['description'].lower()]

    # Sort data
    reverse = (sort_order == 'desc')
    filtered_data.sort(key=lambda x: x[sort_by], reverse=reverse)

    # Paginate data
    start = (page - 1) * per_page
    end = start + per_page
    paginated_data = filtered_data[start:end]

    response = {
        'data': paginated_data,
        'total': len(filtered_data)
    }
    return jsonify(response)


@app.route('/data/<int:item_id>', methods=['DELETE'])
def delete_data(item_id):
    global data
    data = [item for item in data if item['id'] != item_id]
    with open(FILE_DIR, 'w') as file:
        json.dump(data, file)
    return jsonify({'success': True})
