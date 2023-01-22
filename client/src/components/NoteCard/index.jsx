const NoteCard = ({ note }) => {
  return (
    <div className="bg-grey-200 break-inside-avoid mb-6 border px-4 pt-6 pb-6 rounded-md">
      {note}
    </div>
  );
};

export default NoteCard;
