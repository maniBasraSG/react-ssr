# React Boilerplate with Server side rendering

```
#directory structure
|--src
    |--client
        |--assets
            |--images
            |--style.scss
        |--components
            |--containers
            |--general
            |--views
        |--layout
        |--utils
    |--server
        |--helpers
```

## Setup

Clone the repo:

```
cd ./<project directory>
git clone https://bitbucket.org/studiosg/reactboilerplate.git
```

Application will be served on http://localhost:3005

## Scripts

| Script           | Description                                     |
| ---------------- | ----------------------------------------------- |
| `npm install`    | Installs all dependencies                       |
| `npm start`      | Starts project in `development` environment     |
| `npm run deploy` | Builds the project for `production` environment |

## Docker

| Script                                             | Description                                                     |
| -------------------------------------------------- | --------------------------------------------------------------- |
| `docker-compose -f docker-compose-local.yml build` |                                                                 |
| `docker-compose -f docker-compose-local.yml up -d` | starts the containers in the background and leaves them running |
| `docker-compose -f docker-compose-local.yml down`  | stops containers                                                |
| `docker ps`                                        | list of containers                                              |

## Environment variables

Create a `.env` in the root directory and set the following variables.

```
PORT=
MODE=
BASE_API=
```

## Developer guidelines

#### 1. Use absolute path instead of relative path for `container`, `general`, `views` and `utils` folder.

Relative path

```
import Header from '../../components/container/Header';
```

Absolute path

```
import Header from '@container/Header';
```

<sub>Used webpack resolve.alias to make modules import or require easy.</sup>

#### 2. Update the `utils/config.js` with your environment variables.

```
const config = {
	API: {
		url: process.env.BASE_API,
	},
    SAMPLE_DATA: process.env.sample
};
```

#### 3. Replace `react_boilerplate` project name with your project name in docker files.

#### 4. #components/containers

- Split points for major components on a website. For example: Header, Footer, Sidebar.

#### 5. #components/general

- Are concerned with how things look.
- Don't specify how the data is loaded.
- Receive data exclusively via props.
- Rarely have their own state (when they do, it’s UI state rather than data).
- React components that are driven solely by props and don't talk to Redux. Same as “dumb
  components”.

#### 6. #components/views

- Are concerned with how things work.
- Provide the data and behavior to presentational or other container components.
- Most of the type are stateful
- are aware of Redux, Router, etc

### 7. Redux-saga

- https://redux-saga.js.org/docs/introduction/GettingStarted
