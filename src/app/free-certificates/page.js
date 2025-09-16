import CertificateForm from "@/components/CertificateForm";

export default function CertificatePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6">
      <h1 className="text-2xl font-semibold">Certificate Generator</h1>
      <CertificateForm />
    </div>
  );
}
