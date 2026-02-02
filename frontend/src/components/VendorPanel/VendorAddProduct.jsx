import { useState } from "react";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

function VendorAddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    gst: "",
    stock: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [errors, setErrors] = useState({});

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Product name is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.price || form.price <= 0)
      newErrors.price = "Valid price required";
    if (!form.stock || form.stock < 0)
      newErrors.stock = "Stock is required";
    if (images.length === 0)
      newErrors.images = "At least 1 image is required";
    if (images.length > 5)
      newErrors.images = "Maximum 5 images allowed";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    setImages(files.slice(0, 5));
  };

  const handleVideoUpload = e => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      ...form,
      images,
      video,
    };

    console.log("PRODUCT DATA:", payload);
    alert("Product ready to submit (API not connected)");
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Add New Product
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT: FORM */}
        <Card>
          <Input
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-accent bg-white"
            >
              <option value="">Select Category</option>
              <option value="handicraft">Handicraft</option>
              <option value="textile">Textile</option>
              <option value="home-decor">Home Decor</option>
              <option value="art">Art</option>
            </select>
            {errors.category && (
              <p className="text-xs text-red-600 mt-1">
                {errors.category}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Input
              label="Price (₹)"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              error={errors.price}
            />

            <Input
              label="Discount (%)"
              name="discount"
              type="number"
              value={form.discount}
              onChange={handleChange}
            />

            <Input
              label="GST (%)"
              name="gst"
              type="number"
              value={form.gst}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Stock Quantity"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            error={errors.stock}
          />

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary mb-1">
              Product Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-accent"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary mb-1">
              Product Images (Max 5)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            {errors.images && (
              <p className="text-xs text-red-600 mt-1">
                {errors.images}
              </p>
            )}
          </div>

          {/* Video Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-primary mb-1">
              Product Video (optional)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
            />
          </div>

          <Button title="Save Product" onClick={handleSubmit} />
        </Card>

        {/* RIGHT: PREVIEW */}
        <Card>
          <h3 className="font-semibold text-primary mb-4">
            Product Preview
          </h3>

          <p className="font-medium">{form.name || "Product Name"}</p>
          <p className="text-sm text-gray-600 mb-2">
            {form.category || "Category"}
          </p>

          <p className="font-bold mb-4">
            ₹{form.price || "0"}
          </p>

          {/* Image Preview */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="h-20 w-full object-cover rounded"
              />
            ))}
          </div>

          {/* Video Preview */}
          {video && (
            <video
              controls
              className="w-full rounded"
              src={URL.createObjectURL(video)}
            />
          )}
        </Card>
      </div>
    </>
  );
}

export default VendorAddProduct;
