import axios from "axios";

const BASE_URL="http://localhost:5000/api/"
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YmU2MzlkMzZhYzgzYzgyZGVhNGYyOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc3NDIwOTUyMSwiZXhwIjoxNzc0NDY4NzIxfQ.rFRFi8X6ElkTOcxXitrFzi7_JqEM1Zcir3XDBObI7cw"

export const publicRequest=axios.create({
    baseURL:BASE_URL
})

export const userRequest=axios.create({
    baseURL:BASE_URL,
    headers:{token :`BEARER ${TOKEN}` }
})