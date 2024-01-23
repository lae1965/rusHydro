#Карта офиса (тестовое задание)
Данное приложение создано в рамках выполнения тестового задания. Сделана интерактивная карта для добавления, просмотра, удаления и изменения местоположения рабочих мест сотрудников на плане помещения.
Главная страница приложения позволяет выбрать из списка схему помещения по ее названию, либо загрузить новую схему.
При выборе схемы (клик по названию схемы) пользователь попадает на страницу работы со схемой.

- Для создания нового рабочего места сделайте двойной клик левой кнопкой мышки в том месте схемы, в котором собираетесь создать (создание производится с запросом подтверждения).
- Для изменения имени работника сделайте клик мышкой по старому имени (либо надписи "Выберите имя", если оно до этого еще не было выбрано). Появится список всех введенных в базу сотрудников, кликните по нужному.
- Для удаления рабочего места кликните по нему ПРАВОЙ кнопкой мышки (удаление производится с запросом подтверждения).
- Для изменения локации рабочего места захватите его, зажав в любом месте левой кнопкой мышки, затем двигайте мышку, рабочее место будет двигаться вместе с мышкой. При отпускании кнопки захват работать перестанет и новые координаты занесутся в базу данных.

Приложение написано на `Vue.js 3 Option API` c применением `TypeScript`. В качестве хранилища используется библиотека `Pinia Option API`. Запросы выполнены с помощью `Axios`. Маршрутизация - `Vue-router`.

## Запуск frontend'а:

Находясь в папке `frontend`:

- Установить зависимости командой

```bash
npm install
```

- Запустить приложение в режиме разработки

```bash
npm run dev
```

- В браузере в строке запросов ввести:

```bash
http://localhost:5173
```

## Недоделки

Думаю, что продукт MVP у меня получился. Но на все задуманное не хватило времени. Изначально хотел дать возможность ввода реалных размеров схемы после ее выбора, для того чтобы вычислить реальный масштаб, а по нему размеры рабочего места, чтобы расстановка была ближе к реалиям. Были мысли и размеры рабочего места тоже задавать. Сейчас сделано с расчетом, что масштаб примерно 1:10 (+-). И по внутреннему содержанию кода есть над чем поработать, остались мелкие баги.

## Бэкенд

Пришлось сделать несколько правок на бэкенде. На это ушло неприлично много времени, т.к. я никогда раньше не писал и в глаза не видел код не только на Django, но даже и на phyton'е.

- Cors блокировал ответы с бэкенда. Для устранения добавил зависимость `django-cors-headers`, а в файл `offis_map/settings.py` в `INSTALLED_APPS` добавил `'corsheaders'`, а в `MIDDLEWARE` - `'corsheaders.middleware.CorsMiddleware'`

- POST запрос с эндпойнтом `/plans` возвращал ошибку, что требуется переменная `workplases`. Хотя в плане помещения в базе данных этой переменной там делать нечего. Для устранения в файле `map/serializers.py` изменил class PlanSerializer (старый код закомментирован):

```
class PlanSerializer(serializers.ModelSerializer):
    # workplaces = WorkplaceSerializer(many=True)
    # class Meta:
    #     model = Plan
    #     fields = '__all__'
    #     read_only_fields = ['width', 'height']
    workplaces = WorkplaceSerializer(many=True, read_only=True)

    class Meta:
        model = Plan
        fields = '__all__'
        read_only_fields = ['width', 'height']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get('request')
        if request and request.method == 'POST':
            self.fields.pop('workplaces')
```

- Эндпойнт `/users`, который прислали дополнительно по моей просьбе, не возвращал id пользователя, а без id я бы с этим энпойнтом ничего нужного не сделал. Поэтому в последней строке файла `map/serializers.py` вместо

```
fields = ['first_name', 'last_name', 'username']
```

я сделал

```
fields = ['id', 'username']
```
