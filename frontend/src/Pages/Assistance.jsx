import { useState } from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function Assistance() {
  const services = [
    // Business & Compliance
    {
      id: "business-consultant",
      title: "Business Consultant",
      desc: "Strategy, pricing, scaling & growth planning",
      email: "consultant@kutir.com",
    },
    {
      id: "business-registration",
      title: "Business Registration",
      desc: "Register your business correctly from day one",
      email: "business@kutir.com",
    },
    {
      id: "gst",
      title: "GST Registration & Filing",
      desc: "GST registration, returns & compliance support",
      email: "gst@kutir.com",
    },
    {
      id: "ca",
      title: "CA Assistance",
      desc: "Accounting, compliance & financial guidance",
      email: "ca@kutir.com",
    },
    {
      id: "legal",
      title: "Legal Advisory",
      desc: "Contracts, IP, legal compliance support",
      email: "legal@kutir.com",
    },

    // Design & Media
    {
      id: "photography",
      title: "Product Photography & Videography",
      desc: "Professional photoshoots & product videos",
      email: "media@kutir.com",
    },
    {
      id: "graphic-design",
      title: "Graphic Designing",
      desc: "Branding, creatives, banners & visuals",
      email: "design@kutir.com",
    },
    {
      id: "packaging",
      title: "Packaging Design & Sourcing",
      desc: "Product packaging design & vendor sourcing",
      email: "packaging@kutir.com",
    },

    // Tech & Digital
    {
      id: "website",
      title: "Website Development",
      desc: "Business & e-commerce websites",
      email: "tech@kutir.com",
    },
    {
      id: "app",
      title: "App / Software Development",
      desc: "Custom apps, ERP & digital tools",
      email: "tech@kutir.com",
    },

    // Marketing
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      desc: "Ads, SEO, social media growth",
      email: "marketing@kutir.com",
    },
    {
      id: "campaigns",
      title: "Campaign & Festival Promotions",
      desc: "Diwali, melas & seasonal campaigns",
      email: "marketing@kutir.com",
    },

    // Community & Learning
    {
      id: "community",
      title: "Community Engagement",
      desc: "Events, exhibitions, melas & fairs",
      email: "community@kutir.com",
    },
    {
      id: "learning",
      title: "Learning & Training",
      desc: "Workshops on business, digital & finance",
      email: "learning@kutir.com",
    },
  ];


  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    businessStage: "",
    message: "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      service: selectedService.title,
      sendTo: selectedService.email,
      ...form,
    };

    console.log("ASSISTANCE REQUEST:", payload);

    alert(
      "Request submitted successfully!\nOur team will contact you shortly."
    );

    setSelectedService(null);
    setForm({
      name: "",
      phone: "",
      email: "",
      businessStage: "",
      message: "",
    });
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-primary mb-6">
        Kutir Vendor Assistance 🤝
      </h1>

      <p className="text-gray-600 max-w-3xl mb-10">
        From starting your business to scaling it nationwide, Kutir
        supports artisans and vendors at every step of their journey.
      </p>

      {/* SERVICES */}
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Assistance Services
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {services.map(service => (
          <Card
            key={service.id}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedService(service)}
          >
            <h3 className="font-semibold text-primary mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600">
              {service.desc}
            </p>
          </Card>
        ))}
      </div>

      {/* ZERO TO HERO */}
      <h2 className="text-2xl font-semibold text-primary mb-6">
        From Zero to Hero 🚀
      </h2>

      <div className="grid md:grid-cols-5 gap-6">
        {[
          "Idea & Craft Validation",
          "Business Registration & GST",
          "Branding & Packaging",
          "Product Launch & Marketing",
          "Growth & Scaling",
        ].map((step, index) => (
          <Card key={index}>
            <p className="font-medium text-primary">
              Step {index + 1}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {step}
            </p>
          </Card>
        ))}
      </div>

      {/* MODAL FORM */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-[95%] max-w-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {selectedService.title}
            </h3>

            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <Input
              label="Business Stage"
              name="businessStage"
              placeholder="Idea / Started / Scaling"
              value={form.businessStage}
              onChange={handleChange}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-primary mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-accent"
              />
            </div>

            <div className="flex gap-4">
              <Button title="Submit Request" onClick={handleSubmit} />
              <button
                className="text-sm text-gray-500"
                onClick={() => setSelectedService(null)}
              >
                Cancel
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Assistance;
