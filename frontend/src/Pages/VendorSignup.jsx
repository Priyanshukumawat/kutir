import React, { useState, useEffect } from "react";
import PersonalDetails from "../components/VendorRegistration/PersonalDetails";
import BusinessDetails from "../components/VendorRegistration/BusinessDetails";
import BankDetails from "../components/VendorRegistration/BankDetails";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Button from '../components/common/Button'
import axiosInstance from "../utils/axiosInstance";

function VendorSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [checking, setChecking] = useState(true);
  const [vendorStatus, setVendorStatus] = useState(null);
  const user = JSON.parse(localStorage.getItem("kutirUser"));


  useEffect(() => {
    const checkVendorStatus = async () => {
      if (!user?.email) {
        setChecking(false);
        return;
      }

      try {
        const { data } = await axiosInstance.get(
          `/vendor/status?email=${user.email}`
        );

        if (data.exists) {
          setVendorStatus(data);
        }
      } catch (err) {
        console.error("Vendor status check failed", err);
      } finally {
        setChecking(false);
      }
    };

    checkVendorStatus();
  }, []);


  const handleSubmit = async () => {
    try {
      // Build FormData
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== undefined) {
          fd.append(key, form[key]);
        }
      });

      console.log("📤 SUBMITTING VENDOR DATA...");
      for (let pair of fd.entries()) {
        console.log("➡️", pair[0] + ": ", pair[1]);
      }

      // API Request
      const res = await fetch("http://localhost:5000/api/vendor/register", {
        method: "POST",
        body: fd,
      });

      console.log("📩 RAW RESPONSE:", res);

      // Handle server error
      if (!res.ok) {
        let errorData = {};
        try {
          errorData = await res.json();
        } catch (e) {
          console.warn("⚠️ JSON parse error from backend");
        }

        console.error("❌ BACKEND ERROR:", errorData);

        return toast.error(errorData.error || "Server error! Registration failed.");
      }

      // On success
      const data = await res.json();
      console.log("✅ SUCCESS RESPONSE:", data);

      toast.success("Registration submitted successfully!");
      setStep(4);

    } catch (err) {
      console.error("🔥 NETWORK/UNKNOWN ERROR:", err);
      toast.error("Network error! Please try again.");
    }
  };



  //=====================================================
  // BUSINESS TYPES
  //=====================================================
  const businessTypes = [
    { id: "handmade", label: "Handmade & Craft" },
    { id: "art", label: "Art & Paintings" },
    { id: "decor", label: "Home Décor" },
    { id: "clothing", label: "Clothing & Apparel" },
    { id: "jewellery", label: "Jewellery" },
    { id: "accessories", label: "Accessories" },
    { id: "gifts", label: "Gifts & Hampers" },
    { id: "food", label: "Packaged Food (Requires FSSAI)" },
  ];

  const subCategoryMap = {
    handmade: [
      "Handmade Goods",
      "Crochet & Knitting",
      "Candles",
      "Accessories",
      "Hampers & Gifts",
      "Customised Products",
      "Cards & Stationery",
    ],
    art: [
      "Art & Paintings",
      "Sketches (Portraits)",
      "POP Art",
      "Canvas Art",
      "Wall Art",
    ],
    decor: ["Home Décor Items", "Home Furnishing", "Candles", "Décor Pieces"],
    clothing: [
      "Clothing & Apparel",
      "Hand-Painted Clothing",
      "Custom Clothing",
      "Ethnic Wear",
    ],
    jewellery: ["Handmade Jewellery", "Fashion Jewellery", "Custom Jewellery"],
    accessories: [
      "Accessories",
      "Bags & Pouches",
      "Hair Accessories",
      "Keychains",
    ],
    gifts: ["Hampers & Gifts", "Wedding Giftings", "Occasion Gift Boxes"],
    food: [
      "Packaged Food",
      "Snacks",
      "Homemade Pickles",
      "Chocolates",
      "Bakery Goods",
    ],
  };

  //=====================================================
  // FORM STATE
  //=====================================================
  const [form, setForm] = useState({
    // Personal
    fullName: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    aadhaarFile: null,

    // Business
    businessName: "",
    businessEmail: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    about: "",

    businessTypes: [],
    categories: [],

    // Docs
    pan: "",
    panFile: null,
    gst: "",
    gstFile: null,
    fssaiFile: null,
    regDocument: null,
    addressProof: null,

    // Bank
    accName: "",
    accNumber: "",
    ifsc: "",
    bankName: "",
    branch: "",
    bankCity: "",
    bankState: "",
    bankCountry: "",
    bankDoc: null,
  });

  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  //=====================================================
  // FORM UPDATER
  //=====================================================
  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Remove error for this field immediately while typing
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };
  //=====================================================
  // BUSINESS TYPE & CATEGORY SELECTORS
  //=====================================================
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleBusinessType = (id) => {
    setSelectedBusinessTypes((prev) => {
      const exists = prev.includes(id);
      const newTypes = exists ? prev.filter((t) => t !== id) : [...prev, id];
      update("businessTypes", newTypes);

      // When removing a business type, also remove its categories
      if (!exists) return newTypes;
      const itsCategories = subCategoryMap[id] || [];
      setSelectedCategories((prevCats) => {
        const filtered = prevCats.filter((c) => !itsCategories.includes(c));
        update("categories", filtered);
        return filtered;
      });

      return newTypes;
    });
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) => {
      const exists = prev.includes(cat);
      const newCats = exists ? prev.filter((c) => c !== cat) : [...prev, cat];
      update("categories", newCats);
      return newCats;
    });
  };

  //=====================================================
  // VALIDATION ENGINE (with regex + max length logic)
  //=====================================================
  const validateStep = () => {
    const e = {};

    // Common regex patterns
    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    const simpleNameRegex = /^[A-Za-z\s]{1,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^[1-9]\d{5}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const accountNumberRegex = /^\d{9,18}$/;

    // ------------ STEP 1: Personal ------------
    if (step === 1) {
      if (!form.fullName.trim()) {
        e.fullName = "Full name is required.";
      } else if (!nameRegex.test(form.fullName.trim())) {
        e.fullName = "Only letters & spaces, 3–50 characters.";
      }

      if (!mobileRegex.test(form.mobile)) {
        e.mobile = "Enter a valid 10-digit mobile number (starting 6–9).";
      }

      if (!emailRegex.test(form.email.trim())) {
        e.email = "Enter a valid email address.";
      }

      if (!form.dob) {
        e.dob = "Date of birth is required.";
      } else {
        const dobDate = new Date(form.dob);
        const today = new Date();

        if (dobDate > today) {
          e.dob = "Date of birth cannot be in the future.";
        }
      }


      if (!form.gender) {
        e.gender = "Please select your gender.";
      }

      if (!form.aadhaarFile) {
        e.aadhaarFile = "Please upload your Aadhaar document.";
      }
    }

    // ------------ STEP 2: Business ------------
    if (step === 2) {
      if (!form.businessName.trim()) {
        e.businessName = "Business name is required.";
      } else if (form.businessName.trim().length > 80) {
        e.businessName = "Max 80 characters.";
      }

      if (!emailRegex.test(form.businessEmail.trim())) {
        e.businessEmail = "Enter a valid business email.";
      }

      if (!form.address1.trim()) {
        e.address1 = "Address Line 1 is required.";
      } else if (form.address1.trim().length > 100) {
        e.address1 = "Max 100 characters.";
      }

      if (form.address2.trim().length > 100) {
        e.address2 = "Max 100 characters.";
      }

      if (!form.city.trim()) {
        e.city = "City is required.";
      } else if (!simpleNameRegex.test(form.city.trim())) {
        e.city = "Only letters and spaces allowed.";
      }

      if (!form.state.trim()) {
        e.state = "State is required.";
      } else if (!simpleNameRegex.test(form.state.trim())) {
        e.state = "Only letters and spaces allowed.";
      }

      if (!pincodeRegex.test(form.pincode)) {
        e.pincode = "Enter a valid 6-digit pincode.";
      }

      if (!form.businessTypes || form.businessTypes.length === 0) {
        e.businessTypes = "Select at least one type of business.";
      }

      if (!form.categories || form.categories.length === 0) {
        e.categories = "Select at least one category.";
      }

      // PAN (required)
      if (!form.pan.trim()) {
        e.pan = "PAN number is required.";
      } else if (!panRegex.test(form.pan.trim())) {
        e.pan = "PAN must be like AAAAA9999A.";
      }

      if (!form.panFile) {
        e.panFile = "Upload your PAN card document.";
      }

      // GST (optional but must be valid if entered)
      if (form.gst.trim()) {
        if (!gstRegex.test(form.gst.trim())) {
          e.gst = "Enter a valid GST number.";
        }
        if (!form.gstFile) {
          e.gstFile = "Upload GST certificate.";
        }
      }

      // FSSAI (required only if 'food' selected)
      if (form.businessTypes.includes("food")) {
        if (!form.fssaiFile) {
          e.fssaiFile = "FSSAI certificate is required for food business.";
        }
      }

      // Business Registration (optional, but show error if clearly trying)
      if (form.regDocument === null) {
        // optional – no validation
      }

      // Address Proof (optional, but error if explicitly empty in future)
      if (form.addressProof === null) {
        // optional – no validation
      }

      // ABOUT validation (word count)
      const aboutText = form.about.trim();
      if (!aboutText) {
        e.about = "Please write about your business.";
      } else {
        const words = aboutText.split(/\s+/).filter(Boolean);
        if (words.length < 20 || words.length > 150) {
          e.about = "Write between 20 and 150 words about your business.";
        }
      }
    }

    // ------------ STEP 3: Bank ------------
    if (step === 3) {
      if (!form.accName.trim()) {
        e.accName = "Account holder name is required.";
      } else if (!nameRegex.test(form.accName.trim())) {
        e.accName = "Only letters & spaces, 3–50 characters.";
      }

      if (!accountNumberRegex.test(form.accNumber)) {
        e.accNumber = "Account number must be 9–18 digits.";
      }

      if (!ifscRegex.test(form.ifsc.trim())) {
        e.ifsc = "Enter a valid IFSC code (e.g., SBIN0001234).";
      }

      if (!form.bankName.trim()) {
        e.bankName = "Bank name is required.";
      } else if (!simpleNameRegex.test(form.bankName.trim())) {
        e.bankName = "Only letters & spaces allowed.";
      }

      if (!form.branch.trim()) {
        e.branch = "Branch name is required.";
      } else if (!simpleNameRegex.test(form.branch.trim())) {
        e.branch = "Only letters & spaces allowed.";
      }

      if (!form.bankCity.trim()) {
        e.bankCity = "Bank city is required.";
      } else if (!simpleNameRegex.test(form.bankCity.trim())) {
        e.bankCity = "Only letters & spaces allowed.";
      }

      if (!form.bankState.trim()) {
        e.bankState = "Bank state is required.";
      } else if (!simpleNameRegex.test(form.bankState.trim())) {
        e.bankState = "Only letters & spaces allowed.";
      }

      if (!form.bankCountry.trim()) {
        e.bankCountry = "Country is required.";
      } else if (!simpleNameRegex.test(form.bankCountry.trim())) {
        e.bankCountry = "Only letters & spaces allowed.";
      }

      if (!form.bankDoc) {
        e.bankDoc = "Upload bank proof (passbook / cancelled cheque).";
      }

      if (!agreed) {
        e.agreed = "You must agree to the terms & conditions.";
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      setStep((s) => {
        const newStep = s + 1;
        window.location.hash = `#${newStep}`;
        return newStep;
      });
    }
  };

  const prev = () => {
    setStep((s) => {
      const newStep = s - 1;
      window.location.hash = `#${newStep}`;
      return newStep;
    });
  };

  //=====================================================
  // SUCCESS PAGE
  //=====================================================
  if (step === 4) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4 bg-[#FFF0C4]/40">
        <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-lg text-center border border-[#660B05]/30">

          <h2 className="text-2xl font-semibold text-[#3E0703] mb-3">
            🎉 Thank You for Registering!
          </h2>

          <p className="text-[#3E0703]/80 leading-relaxed mb-6">
            Your vendor application has been submitted successfully.
            <br />
            Our team will review your details and verify your documents.
            <br />
            You will be notified once your vendor profile is approved.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              title="Explore Kutir"
              onClick={() => navigate("/")}
              className="sm:w-1/2"
            />
            <Button
              title="Know More About Vendorship"
              onClick={() => navigate("/kutir-assist")}
              className="sm:w-1/2"
            />
          </div>
        </div>
      </div>
    );
  }

  //=====================================================
  // STEPPER
  //=====================================================
  const Stepper = () => (
    <div className="flex justify-center gap-6 mb-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= i ? "bg-accent text-white" : "bg-gray-300 text-gray-700"
              }`}
          >
            {i}
          </div>
        </div>
      ))}
    </div>
  );

  //=====================================================
  // UI RENDER
  //=====================================================
  if (checking) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FFF0C4]/40">
      <div className="bg-white px-6 py-4 rounded-xl shadow text-[#3E0703]">
        Checking vendor status...
      </div>
    </div>
  );
}

if (vendorStatus?.exists) {
  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-[#FFF0C4]/40">
      <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-lg text-center border border-[#660B05]/30">

        {vendorStatus.status === "pending" && (
          <>
            <h2 className="text-xl font-semibold text-[#3E0703] mb-3">
              🕒 Application Under Review
            </h2>
            <p className="text-[#3E0703]/80">
              Your vendor application is currently under review.
              We will notify you once verification is complete.
            </p>
          </>
        )}

        {vendorStatus.status === "approved" && (
          <>
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              ✅ You are Approved!
            </h2>
            <p className="mb-4">Your vendor account is active.</p>
            <Button
              title="Go to Vendor Dashboard"
              onClick={() => navigate("/vendor-panel")}
            />
          </>
        )}

        {vendorStatus.status === "rejected" && (
          <>
            <h2 className="text-xl font-semibold text-red-600 mb-3">
              ❌ Application Rejected
            </h2>
            <p className="text-sm mb-2">
              Reason: {vendorStatus.rejectReason || "Not specified"}
            </p>
            <Button
              title="Reapply"
              onClick={() => {
                setVendorStatus(null);
                setStep(1);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

  return (
    
    <div className="min-h-screen bg-cream/20 flex justify-center px-4 py-10">

      
      <div className="bg-white max-w-2xl w-full p-6 sm:p-8 rounded-2xl shadow-lg border border-accent/20">
        <Stepper />

        <h2 className="text-xl font-semibold text-primary mb-6 text-center">
          Vendor Registration — Step {step}/3
        </h2>

        {step === 1 && (
          <PersonalDetails form={form} errors={errors} update={update} next={next} />
        )}

        {step === 2 && (
          <BusinessDetails
            form={form}
            errors={errors}
            update={update}
            businessTypes={businessTypes}
            subCategoryMap={subCategoryMap}
            selectedBusinessTypes={selectedBusinessTypes}
            selectedCategories={selectedCategories}
            toggleBusinessType={toggleBusinessType}
            toggleCategory={toggleCategory}
            next={next}
            prev={prev}
          />
        )}

        {step === 3 && (
          <BankDetails
            form={form}
            errors={errors}
            update={update}
            agreed={agreed}
            setAgreed={setAgreed}
            submit={handleSubmit}
            prev={prev}
          />
        )}
      </div>
    </div>
  );
}

export default VendorSignup;
