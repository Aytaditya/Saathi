
FROM python:3.13-rc-slim

WORKDIR /app

# Copy only backend requirements and install them
COPY backend/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY backend/ .


EXPOSE 8000


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
