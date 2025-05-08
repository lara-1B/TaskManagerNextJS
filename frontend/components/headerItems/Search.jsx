import { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { FiSearch } from 'react-icons/fi';

export default function SearchInput() {
  const taskContext = useContext(TaskContext);
  const { searchQuery = '', setSearchQuery = () => {}, tasks = [] } = taskContext || {};
  const [query, setQuery] = useState(searchQuery);
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    if (query.length >= 3) {
      const matchedTask = tasks.find((task) =>
        task.title.toLowerCase().startsWith(query.toLowerCase())
      );
      setSuggestion(matchedTask ? matchedTask.title : null);
    } else {
      setSuggestion(null);
    }
  }, [query, tasks]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const getGrayedOutText = (suggestionText, query) => {
    const lowerQuery = query.toLowerCase();
    const lowerSuggestion = suggestionText.toLowerCase();

    if (!suggestionText || !query || !lowerSuggestion.startsWith(lowerQuery)) return null;

    const afterMatch = suggestionText.slice(query.length);

    return (
      <>
        <span className="invisible">{query}</span>
        <span className="text-gray-400">{afterMatch}</span>
      </>
    );
  };

  return (
    <div className="relative flex items-center flex-1">
      <FiSearch className="text-gray-400 mr-2 flex-shrink-0" />
      <div className="relative w-full">
        {/* Suggestion text positioned over the input */}
        {suggestion && query.length >= 3 && (
          <div
            className="absolute top-0 left-0 h-full flex items-center px-0 text-base pointer-events-none"
            style={{ color: 'transparent', textShadow: '0 0 0 rgba(0, 0, 0, 0.15)' }}
          >
            {getGrayedOutText(suggestion, query)}
          </div>
        )}

        {/* Actual input field */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search Task"
          className="w-full bg-transparent outline-none placeholder:text-gray-400 text-base h-8"
        />
      </div>
    </div>
  );
}
