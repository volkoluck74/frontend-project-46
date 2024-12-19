#  Вычислитель отличий

«Вычислитель отличий» – программа, определяющая разницу между двумя структурами данных.

Возможности утилиты:
* Поддержка разных входных форматов: yaml, json
* Генерация отчета в виде plain text, stylish и json

# Установка
1. Склонируйте репозиторий с помощью команды `git clone git@github.com:volkoluck74/frontend-project-46.git`;
2. Установите зависимости командой `make install`.

Утилита gendiff содержит следующие опции:

* -V, --version - номер версии;
* -h, --help - справочная информация;
* -f, -format - формат выходых данных;

В качестве аргументов утилита принимает пути (абсолютный или относительный) к двум файлам в форматах:
* yaml
* json

## Примеры запуска
Ниже приведены примеры запуска утилиты, записанные в asciinema:
* [Сравнение "плоских" json файлов](https://asciinema.org/a/e2h0hA78S0ekahGBIUN2U5qrC)
* [Сравнение "плоских" yaml файлов](https://asciinema.org/a/KHQ9CU68MtI8SN1H6uobMfLMZ)
* [Рекурсивное сравнение в формате stylish](https://asciinema.org/a/pfDls4vBvMMdUUIMc43Fjjure)
* [Рекурсивное сравнение в формате plain](https://asciinema.org/a/HpjxTZFT5Ns9FTkPOnx8wWAFk)
* [Рекурсивное сравнение в формате json](https://asciinema.org/a/3tESzanhXhmCYc3bQz6oJArJG)




### Hexlet tests and linter status:
[![Actions Status](https://github.com/volkoluck74/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/volkoluck74/frontend-project-46/actions)
[![Auto-check](https://github.com/volkoluck74/frontend-project-46/actions/workflows/auto-check.yml/badge.svg)](https://github.com/volkoluck74/frontend-project-46/actions/workflows/auto-check.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d138ce494d9c0ef7f4dd/test_coverage)](https://codeclimate.com/github/volkoluck74/frontend-project-46/test_coverage)

