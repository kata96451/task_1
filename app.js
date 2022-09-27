import fs from 'fs/promises';
console.clear();

const addValue = (values, unit, index) => {
  return {
    ...values,
    [unit]: index
  }
}

async function main() {
  let data = JSON.parse(await fs.readFile('./db.json', { encoding: 'utf8' }));

  data = addValue(data, "mm", "0.001");
  data = addValue(data, "km", "1000");
  data = addValue(data, "yd", "0,9144");

  data = JSON.stringify(data)

  try {
    fs.writeFile('db.json', data)
  } catch (err) {
    console.log(err)
  }
};

main();

async function converteValues(data) {
  const result = {};
  let indexes = JSON.parse(await fs.readFile('./db.json', { encoding: 'utf8' }));

  if (data.distance.unit === data.convert_to) {
    result.value = data.distance.value;
    result.unit = data.distance.unit;
  } else {
    result.value = Number(
      ((+data.distance.value / +indexes[data.distance.unit]) * indexes[data.convert_to]).toFixed(3),
    );
    result.unit = data.convert_to;
  }

  console.log(result);

  return result;
};

converteValues({"distance": {"unit": "m", "value": 0.5}, "convert_to": "ft"});
