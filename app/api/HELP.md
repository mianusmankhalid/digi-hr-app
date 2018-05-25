## Creating APIs

All the APIs related to the app can be found under this folder. Usage and definition could differ from one API to the other.

---

## Taking note

Please take note that APIs must be just calling the API, its process shouldn't be part of calling it. Later the processing could fall under models or any other library method.

---

## Usage

At any point if you want to refer to base URL please use `__API_BASE_URL__` constant to refer to environment's loaded API url. Due to this flexibility we can inject multiple urls without worrying about the API endpoint being wrongly pointed.
