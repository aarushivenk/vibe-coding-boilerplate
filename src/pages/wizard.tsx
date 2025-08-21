import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FOIAWizard = () => {
  const [step, setStep] = useState(1);
  const [requestDetails, setRequestDetails] = useState({
    requesterName: '',
    contactInformation: '',
    description: '',
    recordsRequested: '',
  });

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRequestDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Requester Information</CardTitle>
              <CardDescription>Please provide your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="requesterName">Full Name</Label>
                <Input
                  id="requesterName"
                  name="requesterName"
                  value={requestDetails.requesterName}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactInformation">Contact Information</Label>
                <Input
                  id="contactInformation"
                  name="contactInformation"
                  value={requestDetails.contactInformation}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </CardContent>
          </>
        );

      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
              <CardDescription>Describe the information you are seeking.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Description of Request</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={requestDetails.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="col-span-3"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="recordsRequested">Specific Records Requested (if known)</Label>
                <Textarea
                  id="recordsRequested"
                  name="recordsRequested"
                  value={requestDetails.recordsRequested}
                  onChange={handleInputChange}
                  rows={4}
                  className="col-span-3"
                />
              </div>
            </CardContent>
          </>
        );

      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Review and Submit</CardTitle>
              <CardDescription>Please review your request before submitting.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>Requester Name</Label>
                <p className="font-medium">{requestDetails.requesterName}</p>
              </div>
              <div className="grid gap-2">
                <Label>Contact Information</Label>
                <p className="font-medium">{requestDetails.contactInformation}</p>
              </div>
              <div className="grid gap-2">
                <Label>Description of Request</Label>
                <p className="font-medium">{requestDetails.description}</p>
              </div>
              <div className="grid gap-2">
                <Label>Specific Records Requested</Label>
                <p className="font-medium">{requestDetails.recordsRequested}</p>
              </div>
            </CardContent>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">FOIA Request Form</h1>
      <Card className="max-w-lg mx-auto min-h-[400px] flex flex-col justify-between">
        {renderStep()}
        <CardFooter className="flex justify-between">
          <Button onClick={prevStep} variant="secondary" disabled={step === 1}>Previous</Button>
          <Button onClick={step === 3 ? () => {} : nextStep}>{step === 3 ? "Submit Request" : "Next"}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FOIAWizard;