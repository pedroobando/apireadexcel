# apireadexcel

## Description

Un codigo simple que lee una hoja de calculo en microsoft excel y graba o guarda sus datos en una base de datos Mariadb.

Se crea un servidor con express.. el codigo es muy simple.

El archivo excel se encuentra dentro del direcctoria /data y los datos o campos ya se encuentran predeterminados dentro del archivo readexcel.js que retorna un JSON con los datos de la tabla.

Por otro lado solo en archivo database mantenine la connecion al servidor de base de datos MariaDb.

## kill process active

```bash
# Primero, querrá saber qué proceso está utilizando el puerto 3000
$ sudo lsof -i :3000

# Esto enumerará todos los PID que escuchan en este puerto, una vez que tenga el PID puede terminarlo:
$ kill -9 {PID}
```

## License

Pedro Obando is [MIT licensed](LICENSE).
