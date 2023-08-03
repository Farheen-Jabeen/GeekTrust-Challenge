import SearchBar from "material-ui-search-bar";

export default function Search({ searchQuery, handleSearch }) {
  return (
    <SearchBar
      placeholder="Search by name, email or role....."
      value={searchQuery}
      onChange={handleSearch}
      style={{
        margin: "0 auto",
        marginTop: 15,
        textAlign: "center",
        marginBottom: 15,
        padding: "2px",
        alignItems: "center",
        justifyContent: "center"
      }}
    />
  );
}
