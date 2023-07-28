import { createRoot } from 'react-dom/client';
import { RepositoryList } from './components/RepositoryList';
import './css/index.css';

function render() {
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(<RepositoryList />);
}

render();
