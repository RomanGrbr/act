from flask import json


ITEM = {
        "id": 999,
        "description": "Test Description",
        "create_date": "2023-07-18",
        "data": {"key": "value"}
    }


def test_get_data(client):
    """Получение данных."""
    response = client.get("/data")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert "total" in data


def test_add_data(client):
    """Добавление данных."""
    response = client.post("/data", json=ITEM)
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data["description"] == "Test Description"


def test_delete_data(client):
    """Удаление данных."""
    response = client.delete("/data/999")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["success"] is True
