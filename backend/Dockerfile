FROM python:3.11

WORKDIR /app

COPY . .

RUN pip3 install -r requirements.txt

COPY .flaskenv .flaskenv

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0" ]