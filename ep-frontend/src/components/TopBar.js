const TopBar = () => (
  <header className="flex items-center justify-end bg-white shadow px-8 py-4">
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700"
      onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }}
    >
      Logout
    </button>
  </header>
);
export default TopBar;
