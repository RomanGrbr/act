FROM python:3.11

WORKDIR /app

COPY . .

RUN pip3 install -r requirements.txt

ENV FLASK_APP=backend
ENV FLASK_ENV=development

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0" ]