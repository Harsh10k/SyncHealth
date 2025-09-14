import React, { useState } from "react";

// Basic Navigation Component
function Navigation({
	currentPage,
	setCurrentPage,
}: {
	currentPage: string;
	setCurrentPage: (page: string) => void;
}) {
	const navItems = [
		{ id: "home", label: "Home" },
		{ id: "features", label: "Features" },
		{ id: "api-docs", label: "API Docs" },
		{ id: "use-cases", label: "Use Cases" },
		{ id: "contact", label: "Contact" },
	];

	return (
		<nav className="bg-slate-900/50 backdrop-blur-sm border-b border-white/10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					<div className="flex items-center space-x-2">
						<div className="bg-cyan-500 p-2 rounded-lg">
							<svg
								className="w-6 h-6 text-white"
								fill="currentColor"
								viewBox="0 0 20 20">
								<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<span className="text-xl font-semibold text-cyan-400">
							MediCode Bridge
						</span>
					</div>

					<div className="hidden md:flex space-x-8">
						{navItems.map((item) => (
							<button
								key={item.id}
								onClick={() => setCurrentPage(item.id)}
								className={`px-3 py-2 rounded-lg transition-colors ${
									currentPage === item.id
										? "text-cyan-400 bg-cyan-400/20"
										: "text-white/80 hover:text-white hover:bg-white/10"
								}`}>
								{item.label}
							</button>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
}

// Basic Landing Page
function LandingPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDisease, setSelectedDisease] = useState<any>(null);

	const diseases = [
		{ name: "Diabetes Mellitus", namaste: "NAM-DM-001", icd11: "EE90.0" },
		{ name: "Hypertension", namaste: "NAM-HTN-002", icd11: "EE91.1" },
		{ name: "Vata Vyadhi", namaste: "NAM-VV-101", icd11: "QD85.0" },
	];

	const handleSearch = () => {
		const found = diseases.find((d) =>
			d.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setSelectedDisease(found || null);
	};

	return (
		<div className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto text-center">
				<h1 className="text-4xl md:text-6xl font-bold mb-6 text-cyan-400">
					Bridging Traditional Medicine with Global Standards
				</h1>
				<p className="text-xl text-white/80 mb-12 max-w-4xl mx-auto">
					Seamlessly integrate NAMASTE (AYUSH) terminology with WHO
					ICD-11 Traditional Medicine Module 2.
				</p>

				{/* Search Bar */}
				<div className="max-w-2xl mx-auto mb-12">
					<div className="flex gap-4">
						<input
							type="text"
							placeholder="Enter disease name (e.g., Diabetes, Vata Vyadhi)..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
						/>
						<button
							onClick={handleSearch}
							className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
							Search
						</button>
					</div>
				</div>

				{/* Results */}
				{selectedDisease && (
					<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
						<div className="p-6 bg-cyan-500/20 border border-cyan-400/30 rounded-xl">
							<h3 className="text-lg font-semibold text-cyan-400 mb-2">
								NAMASTE Code
							</h3>
							<div className="text-2xl font-mono font-bold text-white mb-2">
								{selectedDisease.namaste}
							</div>
							<div className="text-white/80">
								AYUSH Terminology System
							</div>
						</div>
						<div className="p-6 bg-indigo-500/20 border border-indigo-400/30 rounded-xl">
							<h3 className="text-lg font-semibold text-indigo-400 mb-2">
								ICD-11 TM2 Code
							</h3>
							<div className="text-2xl font-mono font-bold text-white mb-2">
								{selectedDisease.icd11}
							</div>
							<div className="text-white/80">
								WHO International Classification
							</div>
						</div>
					</div>
				)}

				{/* Features */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					<div className="p-6 bg-white/10 rounded-xl border border-white/20">
						<div className="text-cyan-400 mb-4">🌍</div>
						<h3 className="text-xl font-semibold mb-2 text-white">
							Global Standards
						</h3>
						<p className="text-white/70">
							WHO ICD-11 TM2 compliance for international
							interoperability
						</p>
					</div>
					<div className="p-6 bg-white/10 rounded-xl border border-white/20">
						<div className="text-cyan-400 mb-4">❤️</div>
						<h3 className="text-xl font-semibold mb-2 text-white">
							Traditional Medicine
						</h3>
						<p className="text-white/70">
							NAMASTE terminology for comprehensive AYUSH
							integration
						</p>
					</div>
					<div className="p-6 bg-white/10 rounded-xl border border-white/20">
						<div className="text-cyan-400 mb-4">🛡️</div>
						<h3 className="text-xl font-semibold mb-2 text-white">
							Secure & Compliant
						</h3>
						<p className="text-white/70">
							Indian EHR standards with enterprise-grade security
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

// Basic Features Page
function FeaturesPage() {
	return (
		<div className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-4xl font-bold text-center mb-12 text-cyan-400">
					Features
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="p-8 bg-white/5 rounded-2xl border border-white/10">
						<h3 className="text-xl font-semibold text-white mb-4">
							NAMASTE Integration
						</h3>
						<p className="text-white/80">
							Complete integration with NAMASTE (AYUSH)
							terminology system for traditional medicine coding.
						</p>
					</div>
					<div className="p-8 bg-white/5 rounded-2xl border border-white/10">
						<h3 className="text-xl font-semibold text-white mb-4">
							ICD-11 TM2 Mapping
						</h3>
						<p className="text-white/80">
							Seamless mapping to WHO ICD-11 Traditional Medicine
							Module 2 for global standardization.
						</p>
					</div>
					<div className="p-8 bg-white/5 rounded-2xl border border-white/10">
						<h3 className="text-xl font-semibold text-white mb-4">
							FHIR Compliance
						</h3>
						<p className="text-white/80">
							Full compliance with FHIR standards and Indian EHR
							guidelines.
						</p>
					</div>
					<div className="p-8 bg-white/5 rounded-2xl border border-white/10">
						<h3 className="text-xl font-semibold text-white mb-4">
							Dual-Coding Support
						</h3>
						<p className="text-white/80">
							Simultaneous support for both AYUSH and
							international coding systems.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

// Basic API Docs Page
function APIDocsPage() {
	return (
		<div className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-4xl font-bold text-center mb-12 text-cyan-400">
					API Documentation
				</h1>
				<div className="bg-white/5 rounded-2xl border border-white/10 p-8">
					<h2 className="text-2xl font-bold text-white mb-6">
						Getting Started
					</h2>
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-semibold text-white mb-2">
								Authentication
							</h3>
							<div className="bg-slate-900/50 p-4 rounded-lg">
								<code className="text-cyan-400">
									POST /auth/token
									<br />
									Content-Type: application/json
									<br />
									{`{`}
									<br />
									&nbsp;&nbsp;"client_id": "your_client_id",
									<br />
									&nbsp;&nbsp;"client_secret":
									"your_client_secret"
									<br />
									{`}`}
								</code>
							</div>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-white mb-2">
								Search Codes
							</h3>
							<div className="bg-slate-900/50 p-4 rounded-lg">
								<code className="text-cyan-400">
									GET /v1/codes/search?q=diabetes
									<br />
									Authorization: Bearer YOUR_ACCESS_TOKEN
								</code>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Basic Use Cases Page
function UseCasesPage() {
	return (
		<div className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-4xl font-bold text-center mb-12 text-cyan-400">
					Use Cases
				</h1>
				<div className="space-y-8">
					<div className="bg-white/5 rounded-2xl border border-white/10 p-8">
						<h3 className="text-xl font-semibold text-white mb-4">
							Clinical Workflow
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div className="text-center">
								<div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center mx-auto mb-2">
									1
								</div>
								<p className="text-white/80">
									Doctor enters diagnosis
								</p>
							</div>
							<div className="text-center">
								<div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
									2
								</div>
								<p className="text-white/80">
									System suggests codes
								</p>
							</div>
							<div className="text-center">
								<div className="w-12 h-12 bg-indigo-400 rounded-full flex items-center justify-center mx-auto mb-2">
									3
								</div>
								<p className="text-white/80">
									Automatic mapping
								</p>
							</div>
							<div className="text-center">
								<div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-2">
									4
								</div>
								<p className="text-white/80">Stored in EMR</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Basic Contact Page
function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert("Thank you for your message! We will get back to you soon.");
		setFormData({ name: "", email: "", message: "" });
	};

	return (
		<div className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-4xl font-bold text-center mb-12 text-cyan-400">
					Contact Us
				</h1>
				<div className="bg-white/5 rounded-2xl border border-white/10 p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-white mb-2">
								Name
							</label>
							<input
								type="text"
								required
								value={formData.name}
								onChange={(e) =>
									setFormData({
										...formData,
										name: e.target.value,
									})
								}
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
							/>
						</div>
						<div>
							<label className="block text-white mb-2">
								Email
							</label>
							<input
								type="email"
								required
								value={formData.email}
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target.value,
									})
								}
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
							/>
						</div>
						<div>
							<label className="block text-white mb-2">
								Message
							</label>
							<textarea
								required
								rows={5}
								value={formData.message}
								onChange={(e) =>
									setFormData({
										...formData,
										message: e.target.value,
									})
								}
								className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
							/>
						</div>
						<button
							type="submit"
							className="w-full py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
							Send Message
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

// Basic Chatbot
function Chatbot() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="fixed bottom-6 right-6 z-50">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-14 h-14 bg-cyan-500 rounded-full shadow-xl flex items-center justify-center text-white hover:bg-cyan-600 hover:scale-110 transition-all">
				{isOpen ? "✕" : "💬"}
			</button>

			{isOpen && (
				<div className="absolute bottom-16 right-0 w-80 h-96 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
					<div className="p-4 border-b border-white/10">
						<h3 className="font-semibold text-white">
							MediCode Assistant
						</h3>
						<p className="text-sm text-white/70">
							Ask about code mappings
						</p>
					</div>
					<div className="p-4 flex-1">
						<div className="bg-white/10 p-3 rounded-lg mb-4">
							<p className="text-white/90 text-sm">
								Hello! I can help with NAMASTE-ICD11 mappings.
								Try asking: "What is the ICD-11 code for Vata
								Vyadhi?"
							</p>
						</div>
					</div>
					<div className="p-4 border-t border-white/10">
						<input
							type="text"
							placeholder="Ask about code mappings..."
							className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

// Main App Component
export default function App() {
	const [currentPage, setCurrentPage] = useState("home");

	const renderPage = () => {
		switch (currentPage) {
			case "home":
				return <LandingPage />;
			case "features":
				return <FeaturesPage />;
			case "api-docs":
				return <APIDocsPage />;
			case "use-cases":
				return <UseCasesPage />;
			case "contact":
				return <ContactPage />;
			default:
				return <LandingPage />;
		}
	};

	return (
		<div className="min-h-screen bg-slate-900 text-white">
			<Navigation
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
			<main>{renderPage()}</main>
			<Chatbot />
		</div>
	);
}
