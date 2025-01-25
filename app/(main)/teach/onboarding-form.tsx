// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
// import { DialogTitle } from "@radix-ui/react-dialog";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { toast } from "sonner";

// export default function OnboardingForm({
//   className,
//   title = "Get Started",
// }: {
//   className?: string;
//   title?: string;
// }) {
//   const [open, setOpen] = useState(false);
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     teachingExperience: "",
//     videoExperience: "",
//     expertise: "",
//     topicArea: "",
//     commitment: "",
//   });
//   const [errors, setErrors] = useState({
//     teachingExperience: "",
//     videoExperience: "",
//     expertise: "",
//     topicArea: "",
//     commitment: "",
//   });
//   const router = useRouter();
//   const validateStep = (currentStep: number) => {
//     const newErrors = { ...errors };
//     let isValid = true;

//     switch (currentStep) {
//       case 1:
//         if (!formData.teachingExperience) {
//           newErrors.teachingExperience =
//             "Please select your teaching experience";
//           isValid = false;
//         } else {
//           newErrors.teachingExperience = "";
//         }
//         break;
//       case 2:
//         if (!formData.videoExperience) {
//           newErrors.videoExperience = "Please select your video experience";
//           isValid = false;
//         } else {
//           newErrors.videoExperience = "";
//         }
//         break;
//       case 3:
//         if (!formData.expertise.trim()) {
//           newErrors.expertise = "Please enter your area of expertise";
//           isValid = false;
//         } else {
//           newErrors.expertise = "";
//         }
//         if (!formData.topicArea.trim()) {
//           newErrors.topicArea = "Please enter your topic area";
//           isValid = false;
//         } else {
//           newErrors.topicArea = "";
//         }
//         if (!formData.commitment) {
//           newErrors.commitment = "Please select your time commitment";
//           isValid = false;
//         } else {
//           newErrors.commitment = "";
//         }
//         break;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     setErrors((prev) => ({ ...prev, [field]: "" }));
//   };

//   const handleNext = () => {
//     if (step < 3 && validateStep(step)) {
//       setStep(step + 1);
//     }
//   };
//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (validateStep(3)) {
//       toast.success("Application submitted successfully", {
//         position: "bottom-center",
//       });
//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 2000);
//     }
//   };

//   const handlePrevious = () => {
//     if (step > 1) setStep(step - 1);
//   };
//   const renderFormStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-lg font-medium mb-4">
//                 What&apos;s your teaching experience?{" "}
//                 <span className="text-destructive">*</span>
//               </label>
//               <div className="space-y-3">
//                 {[
//                   { value: "none", label: "No formal teaching experience" },
//                   {
//                     value: "informal",
//                     label: "Informal teaching or mentoring",
//                   },
//                   {
//                     value: "professional",
//                     label: "Professional teaching experience",
//                   },
//                   { value: "online", label: "Online teaching experience" },
//                 ].map((option) => (
//                   <label
//                     key={option.value}
//                     className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
//                     <input
//                       type="radio"
//                       name="teachingExperience"
//                       value={option.value}
//                       checked={formData.teachingExperience === option.value}
//                       onChange={(e) =>
//                         handleInputChange("teachingExperience", e.target.value)
//                       }
//                       className="h-4 w-4"
//                     />
//                     <span>{option.label}</span>
//                   </label>
//                 ))}
//               </div>
//               {errors.teachingExperience && (
//                 <p className="mt-2 text-sm text-destructive">
//                   {errors.teachingExperience}
//                 </p>
//               )}
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-lg font-medium mb-4">
//                 How experienced are you with video creation?{" "}
//                 <span className="text-destructive">*</span>
//               </label>
//               <div className="space-y-3">
//                 {[
//                   { value: "none", label: "No experience" },
//                   {
//                     value: "basic",
//                     label: "Basic recording with smartphone/webcam",
//                   },
//                   {
//                     value: "intermediate",
//                     label: "Some experience with video editing",
//                   },
//                   {
//                     value: "advanced",
//                     label: "Professional video production experience",
//                   },
//                 ].map((option) => (
//                   <label
//                     key={option.value}
//                     className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
//                     <input
//                       type="radio"
//                       name="videoExperience"
//                       value={option.value}
//                       checked={formData.videoExperience === option.value}
//                       onChange={(e) =>
//                         handleInputChange("videoExperience", e.target.value)
//                       }
//                       className="h-4 w-4"
//                     />
//                     <span>{option.label}</span>
//                   </label>
//                 ))}
//               </div>
//               {errors.videoExperience && (
//                 <p className="mt-2 text-sm text-destructive">
//                   {errors.videoExperience}
//                 </p>
//               )}
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-lg font-medium mb-2">
//                 What&apos;s your area of expertise?{" "}
//                 <span className="text-destructive">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.expertise}
//                 onChange={(e) => handleInputChange("expertise", e.target.value)}
//                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring ${
//                   errors.expertise ? "border-destructive" : "border-input"
//                 }`}
//                 placeholder="e.g., Web Development, Digital Marketing, Photography"
//               />
//               {errors.expertise && (
//                 <p className="mt-2 text-sm text-destructive">
//                   {errors.expertise}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label className="block text-lg font-medium mb-2">
//                 What topic area would you like to teach?{" "}
//                 <span className="text-destructive">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.topicArea}
//                 onChange={(e) => handleInputChange("topicArea", e.target.value)}
//                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring ${
//                   errors.topicArea ? "border-destructive" : "border-input"
//                 }`}
//                 placeholder="e.g., JavaScript, Social Media Marketing, Portrait Photography"
//               />
//               {errors.topicArea && (
//                 <p className="mt-2 text-sm text-destructive">
//                   {errors.topicArea}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label className="block text-lg font-medium mb-4">
//                 How much time can you commit to course creation?{" "}
//                 <span className="text-destructive">*</span>
//               </label>
//               <div className="space-y-3">
//                 {[
//                   { value: "part-time", label: "A few hours per week" },
//                   { value: "half-time", label: "10-20 hours per week" },
//                   { value: "full-time", label: "20+ hours per week" },
//                 ].map((option) => (
//                   <label
//                     key={option.value}
//                     className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
//                     <input
//                       type="radio"
//                       name="commitment"
//                       value={option.value}
//                       checked={formData.commitment === option.value}
//                       onChange={(e) =>
//                         handleInputChange("commitment", e.target.value)
//                       }
//                       className="h-4 w-4"
//                     />
//                     <span>{option.label}</span>
//                   </label>
//                 ))}
//               </div>
//               {errors.commitment && (
//                 <p className="mt-2 text-sm text-destructive">
//                   {errors.commitment}
//                 </p>
//               )}
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };
//   return (
//     <>
//       <SignedOut>
//         <SignInButton>
//           <Button size="lg" className={className}>
//             {title}
//           </Button>
//         </SignInButton>
//       </SignedOut>
//       <SignedIn>
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button size="lg" className={className}>
//               {title}
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-h-[90vh] lg:min-w-[50%] xsm:max-h-[80vh] flex flex-col">
//             <DialogHeader>
//               <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                 Instructor Application
//               </DialogTitle>
//               <DialogDescription>
//                 Tell us about your experience and expertise to begin your
//                 journey as an instructor.
//               </DialogDescription>
//             </DialogHeader>
//             <form
//               className="flex-grow flex flex-col overflow-hidden"
//               onSubmit={handleSubmit}>
//               <div className="text-center text-sm text-muted-foreground mb-4">
//                 Step {step} of 3
//               </div>
//               <div className="w-full bg-secondary h-2 rounded-full mb-6">
//                 <div
//                   className="bg-primary dark:bg-indigo-500 h-2 rounded-full transition-all duration-300 ease-in-out"
//                   style={{ width: `${(step / 3) * 100}%` }}
//                 />
//               </div>
//               <div className="flex-grow overflow-y-auto p-4 border rounded-md">
//                 {" "}
//                 {renderFormStep()}
//               </div>

//               <div className="flex justify-between mt-4">
//                 <Button
//                   variant="outline"
//                   type="button"
//                   onClick={handlePrevious}
//                   className={`px-6 py-2 rounded-lg font-medium ${
//                     step !== 1
//                       ? "bg-indigo-500 text-white hover:text-white hover:bg-indigo-600"
//                       : ""
//                   }`}
//                   disabled={step === 1}>
//                   Previous
//                 </Button>
//                 {step < 3 && (
//                   <Button
//                     onClick={handleNext}
//                     type="button"
//                     variant="outline"
//                     disabled={step === 3}
//                     className="px-6 py-2 rounded-lg font-medium bg-indigo-500 text-white hover:text-white  hover:bg-indigo-600">
//                     Next
//                   </Button>
//                 )}
//                 {step === 3 && (
//                   <Button
//                     type="submit"
//                     title="submit"
//                     className="px-6 py-2 rounded-lg font-medium  bg-indigo-500 text-white hover:text-white  hover:bg-indigo-600">
//                     Submit
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </SignedIn>
//     </>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface FormData {
  teachingExperience: string;
  videoExperience: string;
  expertise: string;
  topicArea: string;
  commitment: string;
}

interface Errors {
  teachingExperience?: string;
  videoExperience?: string;
  expertise?: string;
  topicArea?: string;
  commitment?: string;
}

const initialFormData: FormData = {
  teachingExperience: "",
  videoExperience: "",
  expertise: "",
  topicArea: "",
  commitment: "",
};

const initialErrors: Errors = {};

const RadioGroup = ({
  name,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) => (
  <div>
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
    {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
  </div>
);

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) => (
  <div>
    <label className="block text-base font-medium mb-2">{label}</label>
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={error ? "border-destructive" : ""}
    />
    {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
  </div>
);

export default function OnboardingForm({
  className,
  title = "Get Started",
}: {
  className?: string;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Errors>(initialErrors);
  const router = useRouter();

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Errors = {};
    let isValid = true;

    if (currentStep === 1 && !formData.teachingExperience) {
      newErrors.teachingExperience = "Please select your teaching experience.";
      isValid = false;
    }

    if (currentStep === 2 && !formData.videoExperience) {
      newErrors.videoExperience = "Please select your video experience.";
      isValid = false;
    }

    if (currentStep === 3) {
      if (!formData.expertise.trim()) {
        newErrors.expertise = "Please enter your area of expertise.";
        isValid = false;
      }
      if (!formData.topicArea.trim()) {
        newErrors.topicArea = "Please enter your topic area.";
        isValid = false;
      }
      if (!formData.commitment) {
        newErrors.commitment = "Please select your time commitment.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleNext = () => {
    if (step < 3 && validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateStep(3)) {
      toast.success("Application submitted successfully", {
        position: "bottom-center",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label className="block text-base font-medium mb-4">
              What&apos;s your teaching experience?{" "}
              <span className="text-destructive">*</span>
            </label>
            <RadioGroup
              name="teachingExperience"
              options={[
                { value: "none", label: "No formal teaching experience" },
                { value: "informal", label: "Informal teaching or mentoring" },
                {
                  value: "professional",
                  label: "Professional teaching experience",
                },
                { value: "online", label: "Online teaching experience" },
              ]}
              value={formData.teachingExperience}
              onChange={(value) =>
                handleInputChange("teachingExperience", value)
              }
              error={errors.teachingExperience}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block text-base font-medium mb-4">
              How experienced are you with video creation?{" "}
              <span className="text-destructive">*</span>
            </label>

            <RadioGroup
              name="videoExperience"
              options={[
                { value: "none", label: "No experience" },
                {
                  value: "basic",
                  label: "Basic recording with smartphone/webcam",
                },
                {
                  value: "intermediate",
                  label: "Some experience with video editing",
                },
                {
                  value: "advanced",
                  label: "Professional video production experience",
                },
              ]}
              value={formData.videoExperience}
              onChange={(value) => handleInputChange("videoExperience", value)}
              error={errors.videoExperience}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-2">
            <InputField
              label="What’s your area of expertise?"
              placeholder="e.g., Web Development, Digital Marketing"
              value={formData.expertise}
              onChange={(value) => handleInputChange("expertise", value)}
              error={errors.expertise}
            />
            <InputField
              label="What topic area would you like to teach?"
              placeholder="e.g., JavaScript, Social Media Marketing"
              value={formData.topicArea}
              onChange={(value) => handleInputChange("topicArea", value)}
              error={errors.topicArea}
            />
            <div>
              <label className="block text-base font-medium mb-4">
                How much time can you commit to course creation?{" "}
                <span className="text-destructive">*</span>
              </label>
              <RadioGroup
                name="commitment"
                options={[
                  { value: "part-time", label: "A few hours per week" },
                  { value: "half-time", label: "10-20 hours per week" },
                  { value: "full-time", label: "20+ hours per week" },
                ]}
                value={formData.commitment}
                onChange={(value) => handleInputChange("commitment", value)}
                error={errors.commitment}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button size="lg" className={className}>
            {title}
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className={className}>
              {title}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] lg:min-w-[50%] xsm:max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Instructor Application
              </DialogTitle>
              <DialogDescription>
                Tell us about your experience and expertise to begin your
                journey as an instructor.
              </DialogDescription>
            </DialogHeader>
            <form
              className="flex-grow flex flex-col overflow-hidden"
              onSubmit={handleSubmit}>
              <div className="text-center text-sm mb-2">Step {step} of 3</div>
              <div className="w-full bg-secondary h-2 rounded-full">
                <div
                  className="bg-primary dark:bg-indigo-500  h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
              <div className="flex-grow overflow-y-auto p-4 border rounded-md my-4">
                {renderFormStep()}
              </div>
              <div className="flex justify-between mt-2">
                <Button
                  variant="outline"
                  onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                  disabled={step === 1}>
                  Previous
                </Button>
                {step < 3 && <Button onClick={handleNext}>Next</Button>}
                {step === 3 && (
                  <Button
                    type="submit"
                    className="bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white">
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </SignedIn>
    </>
  );
}
