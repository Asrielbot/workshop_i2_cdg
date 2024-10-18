const fetchImages = async () => {
  try {
    const response = await fetch("http://localhost:3000/image");
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    const data = await response.json();
    console.log(data); // Traiter les images ici
  } catch (error) {
    console.error("Error:", error);
  }
};

const addImage = async (
  content_image: string,
  id_post: string,
  isfiltered: boolean
) => {
  try {
    const response = await fetch("http://localhost:3000/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content_image,
        id_post,
        isfiltered,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add image");
    }

    const data = await response.json();
    console.log("Image added:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateImage = async (
  id_image: string,
  content_image: string,
  id_post: string,
  isfiltered: boolean
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/image?id_image=${id_image}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content_image,
          id_post,
          isfiltered,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update image");
    }

    const data = await response.json();
    console.log("Image updated:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

const deleteImage = async (id_image: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/image?id_image=${id_image}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete image");
    }

    console.log("Image deleted");
  } catch (error) {
    console.error("Error:", error);
  }
};
