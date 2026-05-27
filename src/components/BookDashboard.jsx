import { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import BookCard from './BookCard';
import BookModal from './BookModal';
import { getBooks, createBook, updateBook, deleteBook } from '../api';

const BookDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please ensure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSaveBook = async (bookData) => {
    try {
      if (editingBook) {
        await updateBook(editingBook.id, bookData);
      } else {
        await createBook(bookData);
      }
      setIsModalOpen(false);
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      alert('Failed to save book');
      console.error(err);
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        fetchBooks();
      } catch (err) {
        alert('Failed to delete book');
        console.error(err);
      }
    }
  };

  const openAddModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    return matchesSearch && matchesGenre;
  });

  const genres = [...new Set(books.map(book => book.genre))];

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading books...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--danger)' }}>{error}</div>;
  }

  return (
    <div className="animate-fade-in">
      {/* Controls Bar */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        
        <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: 'var(--border-radius-md)', padding: '0 1rem', border: '1px solid var(--border-color)' }}>
          <Search size={20} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search by title or author..." 
            style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '0.75rem', outline: 'none' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: 'var(--border-radius-md)', padding: '0 1rem', border: '1px solid var(--border-color)' }}>
          <Filter size={20} color="var(--text-secondary)" />
          <select 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '0.75rem', outline: 'none', cursor: 'pointer' }}
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <button onClick={openAddModal} className="btn btn-primary" style={{ marginLeft: 'auto' }}>
          <Plus size={20} /> Add Book
        </button>
      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          No books found matching your criteria.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onEdit={openEditModal} 
              onDelete={handleDeleteBook} 
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <BookModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveBook} 
        initialData={editingBook} 
      />
    </div>
  );
};

export default BookDashboard;
