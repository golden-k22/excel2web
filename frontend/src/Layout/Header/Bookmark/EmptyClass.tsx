
const EmpltyClass = ({ searchIcon }: any) => {
  return (
    <div
      className={` empty-menu Typeahead-menu empty-bookmark ${searchIcon ? "is-open" : ""}`}>
      <div className="tt-dataset tt-dataset-0">
        <div className="EmptyMessage">
          {"Opps!! There are no result found."}
        </div>
      </div>
    </div>
  );
};

export default EmpltyClass;
