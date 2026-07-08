"use client";
import React, { useState } from "react";
import { Input, TextArea, Button, Dropdown, Label } from "@heroui/react";

const genres = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery",
  "Thriller", "Romance", "Horror", "Biography", "History",
  "Science", "Technology", "Self-Help", "Children", "Other",
];


const BookAddPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    availableQuantity: "",
    totalQuantity: "",
    genre: "",
    publishedYear: "",
    coverImage: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadToImgBB = async () => {
    if (!imageFile) return null;
    setUploading(true);
    try {
      const data = new FormData();
      data.append("image", imageFile);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      return json.data?.url || null;
    } catch (err) {
      console.error("ImgBB upload failed:", err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    let coverImageUrl = formData.coverImage;

    if (imageFile) {
      const uploaded = await uploadToImgBB();
      if (uploaded) coverImageUrl = uploaded;
    }

    const finalData = { ...formData, coverImage: coverImageUrl };
    console.log("Book Data:", finalData);
    // call your API here later with finalData
  };

  return (
    <div className="min-h-screen py-10 px-4" style={{ backgroundColor: "#E6F2DD" }}>
      <div className="max-w-2xl mx-auto rounded-2xl shadow-lg p-8 bg-white">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#659287" }}>
            Add New Book
          </h1>
          <p className="text-sm mt-1" style={{ color: "#88BDA4" }}>
            Fill in the details below to add a book to the library.
          </p>
          <div className="mt-3 h-1 w-16 rounded-full" style={{ backgroundColor: "#88BDA4" }} />
        </div>

        <div className="flex flex-col gap-5">

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#659287" }}>
              Title <span className="text-red-400">*</span>
            </label>
            <Input
              name="title"
              placeholder="Enter book title"
              value={formData.title}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Author */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#659287" }}>
              Author <span className="text-red-400">*</span>
            </label>
            <Input
              name="author"
              placeholder="Enter author name"
              value={formData.author}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Genre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "#659287" }}>
              Genre <span className="text-red-400">*</span>
            </label>
            <Dropdown>
              <Button
                variant="secondary"
                className="w-full justify-between border rounded-xl px-3 py-2 text-left"
                style={{ borderColor: "#B1D3B9" }}
              >
                {formData.genre || "Select a genre"}
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  onAction={(key) =>
                    setFormData((prev) => ({ ...prev, genre: key }))
                  }
                >
                  {genres.map((genre) => (
                    <Dropdown.Item key={genre} id={genre} textValue={genre}>
                      <Label>{genre}</Label>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>

          {/* Quantities */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: "#659287" }}>
                Total Quantity <span className="text-red-400">*</span>
              </label>
              <Input
                name="totalQuantity"
                placeholder="e.g. 10"
                type="number"
                min={0}
                value={formData.totalQuantity}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: "#659287" }}>
                Available Quantity <span className="text-red-400">*</span>
              </label>
              <Input
                name="availableQuantity"
                placeholder="e.g. 8"
                type="number"
                min={0}
                value={formData.availableQuantity}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Published Year */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#659287" }}>
              Published Year
            </label>
            <Input
              name="publishedYear"
              placeholder="e.g. 2021"
              type="number"
              value={formData.publishedYear}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Cover Image Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "#659287" }}>
              Cover Image
            </label>
            <div
              className="border-2 border-dashed rounded-xl p-5 flex flex-col items-center gap-3 cursor-pointer transition-colors"
              style={{ borderColor: "#B1D3B9", backgroundColor: "#f7fdf9" }}
              onClick={() => document.getElementById("coverImageInput").click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Cover preview"
                  className="w-32 h-44 object-cover rounded-lg shadow"
                />
              ) : (
                <>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: "#E6F2DD" }}
                  >
                    📚
                  </div>
                  <p className="text-sm" style={{ color: "#88BDA4" }}>
                    Click to upload cover image
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                </>
              )}
            </div>
            <input
              id="coverImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <button
                type="button"
                className="text-xs text-red-400 self-start hover:underline"
                onClick={() => { setImageFile(null); setImagePreview(null); }}
              >
                Remove image
              </button>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#659287" }}>
              Description
            </label>
            <TextArea
              name="description"
              aria-label="Description"
              placeholder="Write a short description of the book..."
              value={formData.description}
              onChange={handleChange}
              className="w-full h-32"
            />
          </div>

          {/* Submit */}
          <Button
            onPress={handleSubmit}
            isLoading={uploading}
            className="w-full mt-2 text-white font-semibold text-base rounded-xl py-6"
            style={{ backgroundColor: "#659287" }}
          >
            {uploading ? "Uploading image..." : "Add Book"}
          </Button>

        </div>
      </div>
    </div>
  );
};

export default BookAddPage;