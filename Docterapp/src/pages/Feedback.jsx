import React, { useState } from "react";

const Feedback = () => {
    const [form, setForm] = useState({
        email: "",
        fullname: "",
        comment: "",
        rate: 1,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        // Name: only letters, at least two words, each starting with a capital, no numbers
        if (!/^([A-Z][a-z]+\s){1,}[A-Z][a-z]+$/.test(form.fullname.trim())) {
            newErrors.fullname = "Enter your full name (first and last, capitalized, no numbers).";
        }
        // Email: must be a valid email
        if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email.trim())) {
            newErrors.email = "Enter a valid email address.";
        }
        // Comment: must be a proper sentence, at least 10 characters, can include numbers, letters, and emojis
        if (form.comment.trim().length < 10 || !/[a-zA-Z]/.test(form.comment)) {
            newErrors.comment = "Comment must be a proper sentence, at least 10 characters, and include letters.";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        // Handle form submission logic here
        alert("Feedback submitted!");
    };

    return (
        <div className="container mt-5" style={{ marginBottom: '15px'}}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Feedback Form</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-start w-100">
                                        Email address
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text" id="email-addon">
                                            <i className="bi bi-envelope"></i>
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="name@example.com"
                                            aria-label="Email"
                                            aria-describedby="email-addon"
                                        />
                                    </div>
                                    {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fullname" className="form-label text-start w-100">
                                        Full Name
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text" id="fullname-addon">
                                            <i className="bi bi-person"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullname"
                                            name="fullname"
                                            value={form.fullname}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your full name"
                                            aria-label="Full Name"
                                            aria-describedby="fullname-addon"
                                        />
                                    </div>
                                    {errors.fullname && <div className="text-danger small mt-1">{errors.fullname}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="comment" className="form-label">
                                        Comment
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="comment"
                                        name="comment"
                                        rows="4"
                                        value={form.comment}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your feedback..."
                                    ></textarea>
                                    {errors.comment && <div className="text-danger small mt-1">{errors.comment}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Rate</label>
                                    <div>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                type="button"
                                                key={star}
                                                className={`btn btn-link p-0 m-0 ${
                                                    form.rate >= star ? "text-warning" : "text-secondary"
                                                }`}
                                                onClick={() =>
                                                    setForm((prev) => ({ ...prev, rate: star }))
                                                }
                                                style={{ fontSize: "1.5rem", textDecoration: "none" }}
                                                tabIndex={-1}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Submit Feedback
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;