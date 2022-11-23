import "./imagesSelector.css";
const ImageTypes = ["image/jpeg", "image/png"];

const ImagesSelector = ({ selectImage, images, addImage, deleteImage }) => {
  const onFileSelected = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (!ImageTypes.includes(file["type"])) {
      alert("Invalid File!");
      return;
    }

    addImage(file);
    event.target.value = null;
  };

  return (
    <div>
      <h1>Images</h1>
      <br />
      {images.length > 0 ? (
        <div className="images_list">
          {images.map((img, i) => {
            return (
              <div key={`img_${i}`} className="image_tile">
                <img
                  alt="not fount"
                  width="200px"
                  height="150px"
                  src={URL.createObjectURL(img)}
                  onClick={() => selectImage(img)}
                />

                <div className="delete_button" onClick={() => deleteImage(i)}>
                  X
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>Empty</h3>
      )}

      <div className="add_button_container">
        <label className="custom-file-upload">
          <input type="file" name="myImage" onChange={onFileSelected} />
          Add Pic+
        </label>
      </div>
    </div>
  );
};

export default ImagesSelector;
