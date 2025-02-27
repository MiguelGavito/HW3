export const getWeather = async (city: string) => {
  const WEATHER_API_KEY = 'a0c6764eea434cf5888133734252702' //cambiar por la clave de la API de clima
  const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Ciudad no encontrada');

    const data = await response.json();

    return {
      location: {
        name: data.location.name,
        country: data.location.country,
      },
      current: {
        temp_c: data.current.temp_c,
        humidity: data.current.humidity,
        uv: data.current.uv,
        air_quality: data.current.air_quality ? data.current.air_quality["us-epa-index"] : null,
        condition: {
          text: data.current.condition.text,
          icon: data.current.condition.icon,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};