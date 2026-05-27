import { Edit2, Trash2 } from 'lucide-react';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="glass-panel book-card">
      <div className="book-card-image" style={{
        height: '200px',
        backgroundImage: `url(${book.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderTopLeftRadius: 'var(--border-radius-lg)',
        borderTopRightRadius: 'var(--border-radius-lg)'
      }}></div>
      
      <div className="book-card-content" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>{book.title}</h3>
          <span style={{ 
            fontSize: '0.75rem', 
            padding: '0.25rem 0.5rem', 
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            color: 'var(--accent-primary)',
            borderRadius: '1rem',
            fontWeight: '500'
          }}>
            {book.genre}
          </span>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>By {book.author}</p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.8rem' }}>Published: {book.publicationYear}</p>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => onEdit(book)} className="btn btn-outline" style={{ flex: 1 }}>
            <Edit2 size={16} /> Edit
          </button>
          <button onClick={() => onDelete(book.id)} className="btn btn-danger" style={{ flex: 1 }}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
