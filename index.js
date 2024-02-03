const imageForm = document.querySelector("#imageForm");
const imageInput = document.querySelector("#imageInput");

imageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = imageInput.files[0];

  // get secure url from our server
  const { url } = await fetch("http://127.0.0.1:8080/s3Url").then((res) =>
    res.json()
  );
  console.log(url);

  // post the image direclty to the s3 bucket
  //const contentType = file.type;
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: file,
  });

  const imageUrl = url.split("?")[0];
  console.log(imageUrl);

  // post requst to my server to store any extra data

  const img = document.createElement("img");
  img.src = imageUrl;
  document.body.appendChild(img);
});

const AWS = require("aws-sdk");

const bucketName = "direct-upload-s3-bucket-thing-nancy"; // Replace with your actual S3 bucket name

const s3 = new AWS.S3();

function getS3ImageUrls(bucketName) {
  return new Promise((resolve, reject) => {
    const params = { Bucket: bucketName };

    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const imageUrls = data.Contents.map(
          (obj) => `https://${bucketName}.s3.amazonaws.com/${obj.Key}`
        );
        resolve(imageUrls);
      }
    });
  });
}

// Call the function
getS3ImageUrls(bucketName)
  .then((imageUrls) => {
    // Print or use the list of image URLs
    imageUrls.forEach((url) => console.log(url));
  })
  .catch((error) => {
    console.error("Error:", error);
  });
