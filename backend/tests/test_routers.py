import pytest
from flask import json


def test_get_data(client):
    response = client.get("/data")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "data" in data
    assert "total" in data


def test_add_data(client):
    new_item = {
        "id": 999,
        "description": "Test Description",
        "create_date": "2023-07-18",
        "data": {"key": "value"}
    }
    response = client.post("/data", json=new_item)
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data["description"] == "Test Description"


def test_delete_data(client):
    response = client.delete("/data/999")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["success"] is True
