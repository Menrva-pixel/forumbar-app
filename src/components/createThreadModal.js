const CreateThreadModal = ({ showModal, setShowModal, newThread, setNewThread, handleThreadSubmit }) => {
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleSubmit = () => {
      handleThreadSubmit();
      handleCloseModal();
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Create New Thread</h2>
          <input
            type="text"
            placeholder="Title"
            value={newThread}
            onChange={(e) => setNewThread(e.target.value)}
            className="input"
          />
          <div className="modal-buttons">
            <button onClick={handleCloseModal} className="button">Cancel</button>
            <button onClick={handleSubmit} className="button">Create</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateThreadModal;
  