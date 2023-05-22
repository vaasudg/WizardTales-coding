# Readme

This repository contains a set of classes that can be used for scanning directories and subdirectories, searching for a keyword in files, and performing other related tasks. The main classes included in this repository are `ClipBoard` and `ScanFiles`.

Warning: When using the startScan method with large-sized Git repositories, it may slow down the process due to the potentially large number of files to be scanned. Additionally, please note that the provided API token used for authentication may expire if the scanning process takes a long time. It is recommended to consider these factors and monitor the execution time and token expiration while scanning large repositories.

## ClipBoard

The `ClipBoard` class provides a method to copy text to the clipboard. It contains the following method:

### `copy(data: any): void`

This method takes a `data` parameter and copies it to the clipboard. The `data` parameter should be a string. If the `data` is not a string, an informational log message will be displayed.

## ScanFiles

The `ScanFiles` class provides functionality to recursively scan directories and subdirectories, searching for a keyword in files. It contains the following method:

### `startScan(options: ScanFilesI): Promise<any>`

This method takes an `options` object as a parameter, which includes the following properties:

- `directoryPath` (string): The path of the directory to scan.
- `keyword` (string): The keyword to search for in the files.
- `repoUrl` (string, optional): The URL of the repository.
- `responseType` (ResponseType, optional): The response type for API requests.
- `callback` ((data: any) => boolean, optional): Optional callback function for handling the results.

The method returns a promise that resolves to an array of objects representing files matching the keyword.

Here is an example usage of the `startScan` method:

```javascript
const scanner = new ScanFiles()

scanner
  .startScan({
    directoryPath: '/path/to/directory',
    keyword: 'searchKeyword'
  })
  .then(results => {
    // Handle the results
  })
  .catch(error => {
    // Handle the error
  })
```

Please note that you need to provide appropriate values for the `directoryPath` and `keyword` parameters.

## Dependencies

The following dependencies are required to use the classes:

- `axios`: A popular HTTP client library for making API requests.
- `url`: A built-in Node.js module for working with URLs.
- `axios`: Making the http call.
- `bunyan`: A module creating loggers.
- `ejs`: EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.

Please ensure that these dependencies are installed in your project before using the classes.

## Run

To use the classes in your project, you can import them as follows:

```javascript
import { ClipBoard, ScanFiles } from './path/to/classes'
```

## Usage

To use the classes in your project, you can import them as follows:

```javascript
npm start
```

Make sure to provide the correct path to the classes based on your project structure.

## Contributions

Contributions to this repository are welcome. If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This repository is licensed under the [MIT License](https://opensource.org/licenses/MIT).
