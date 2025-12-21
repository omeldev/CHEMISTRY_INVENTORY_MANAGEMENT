import {RouterProvider} from 'react-router-dom';
import router from './router';
// hinzugefügt: Provider und store importieren
import {Provider} from 'react-redux';
import store from '../store';

export default function App() {
  return (
    // Store per Provider verfügbar machen
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  );
}
