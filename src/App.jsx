import { Library } from 'lucide-react';
import BookDashboard from './components/BookDashboard';

function App() {
  return (
    <div className="app-container animate-fade-in">
      <header className="app-header" style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '2rem', backgroundColor: 'var(--glass-bg)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem' }}>
          <Library size={32} color="var(--accent-primary)" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.5px' }}>Lumina Books</h1>
        </div>
      </header>
      
      <main className="container" style={{ paddingTop: '0' }}>
        <BookDashboard />
      </main>
    </div>
  );
}

export default App;
