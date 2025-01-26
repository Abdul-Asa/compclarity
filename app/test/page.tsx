"use client";

import { Button } from "@/components/ui/button";
import CTABadge from "@/components/ui/cta-badge";
import { Plus, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/lib/hooks/useToast";
import { ModeToggle } from "@/components/providers/ThemeProvider";
import { ToastAction } from "@/components/ui/toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { PhoneInput } from "@/components/ui/phone-input";
import { AutoComplete } from "@/components/ui/autocomplete";
import { FileUploader } from "@/components/ui/file-upload";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { DateTimeInput } from "@/components/ui/datetime-input";
import { SimpleTimePicker } from "@/components/ui/datetime-simple";
import DatePicker from "@/components/ui/date-picker";

const ColorBlock = ({ className, colorName }: { className: string; colorName: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <div className={`w-10 h-10 rounded-sm border ${className}`} />
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">{colorName}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const ToastButton = ({ children, toastProps }: { children: React.ReactNode; toastProps: any }) => {
  const toast = useToast();
  return <Button onClick={() => toast.toast(toastProps)}>{children}</Button>;
};

const testFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const TestForm = () => {
  const form = useForm<z.infer<typeof testFormSchema>>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof testFormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="CompClarity" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

// Define all component examples in a single object
const components = {
  colors: {
    title: "Colors",
    description: "All colors",
    variants: [
      {
        title: "Backgrounds",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <ColorBlock className="bg-background border-border" colorName="Background" />
            <ColorBlock className="bg-foreground border-border" colorName="Foreground" />
            <ColorBlock className="bg-neutral border-border" colorName="Neutral" />
            <ColorBlock className="bg-primary border-border" colorName="Primary" />
            <ColorBlock className="bg-primary-light border-border" colorName="Primary Light" />
            <ColorBlock className="bg-primary-dark border-border" colorName="Primary Dark" />
          </div>
        ),
      },
      {
        title: "Accents",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <ColorBlock className="bg-accent border-border" colorName="Accent" />
            <ColorBlock className="bg-accent-foreground border-border" colorName="Accent Foreground" />
            <ColorBlock className="bg-destructive border-border" colorName="Destructive" />
            <ColorBlock className="bg-destructive-secondary border-border" colorName="Destructive Secondary" />
            <ColorBlock className="bg-muted border-border" colorName="Muted" />
            <ColorBlock className="bg-muted-foreground border-border" colorName="Muted Foreground" />
            <ColorBlock className="bg-secondary border-border" colorName="Secondary" />
            <ColorBlock className="bg-secondary-foreground border-border" colorName="Secondary Foreground" />
          </div>
        ),
      },
      {
        title: "Borders",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <ColorBlock className="bg-border border-neutral" colorName="Border" />
            <ColorBlock className="bg-border-light border-neutral" colorName="Border Light" />
            <ColorBlock className="bg-border-dark border-neutral" colorName="Border Dark" />
            <ColorBlock className="bg-input border-neutral" colorName="Input" />
            <ColorBlock className="bg-ring border-neutral" colorName="Ring" />
          </div>
        ),
      },
      {
        title: "Cards",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <ColorBlock className="bg-card border-border" colorName="Card" />
            <ColorBlock className="bg-card-foreground border-border" colorName="Card Foreground" />
            <ColorBlock className="bg-popover border-border" colorName="Popover" />
            <ColorBlock className="bg-popover-foreground border-border" colorName="Popover Foreground" />
          </div>
        ),
      },
    ],
  },
  buttons: {
    title: "Buttons",
    description: "Available button variations and sizes",
    variants: [
      {
        title: "Default Button with Loading State",
        component: (
          <div className="flex gap-4 items-center">
            <Button>Default</Button>
            <code className="text-sm bg-muted p-2 rounded">size="default"</code>
          </div>
        ),
      },
      {
        title: "Size Variations",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Plus />
            </Button>
          </div>
        ),
      },
      {
        title: "Variants",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <ModeToggle />
          </div>
        ),
      },
      {
        title: "Props",
        component: (
          <div className="flex gap-4 items-center">
            <Button loading>Loading</Button>
            <Button tooltip="Tooltip">Tooltip</Button>
          </div>
        ),
      },
    ],
  },
  cards: {
    title: "Cards",
    description: "Card component",
    variants: [
      {
        title: "Default Card",
        component: (
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ),
      },
      {
        title: "Variants",
        component: () => {
          return (
            <div className="flex gap-4 items-center">
              <Card className="flex-1 max-w-xl">
                <CardHeader>
                  <CardTitle>Profile Form</CardTitle>
                  <CardDescription>Enter your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <TestForm />
                </CardContent>
              </Card>
              <Card className="flex-1" collapsible>
                <CardHeader>
                  <CardTitle>Personal</CardTitle>
                  <CardDescription>Personal description</CardDescription>
                </CardHeader>
                <CardContent>
                  <TestForm />
                </CardContent>
              </Card>
            </div>
          );
        },
      },
    ],
  },
  modals: {
    title: "Modals",
    description: "Modal component",
    variants: [
      {
        title: "Default Modal",
        component: () => {
          return (
            <Modal trigger={<Button>Open Modal</Button>}>
              <TestForm />
            </Modal>
          );
        },
      },
    ],
  },
  inputs: {
    title: "Input",
    description: "Input component",
    variants: [
      {
        title: "Different Inputs",
        component: (
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="Default" />
            <Input placeholder="With Icon" icon={<User />} />
            <Input placeholder="Disabled" disabled />
            <Input type="password" placeholder="Password" toggleAllowed />
            <Input type="email" placeholder="Email" />
            <PhoneInput placeholder="Number" />
            <AutoComplete
              placeholder="autocomplete"
              options={[
                { label: "London", value: "london" },
                { label: "Paris", value: "paris" },
                { label: "New York", value: "new-york" },
              ]}
            />
            <AutoComplete
              placeholder="autocomplete loading"
              options={[
                { label: "London", value: "london" },
                { label: "Paris", value: "paris" },
                { label: "New York", value: "new-york" },
              ]}
              isLoading
            />
            <Input type="date" placeholder="Date" />
            <Input type="time" placeholder="Time" />
            <Input type="month" placeholder="Month" />
            <Input type="color" placeholder="Color" />
            <Input type="file" placeholder="File" />
            <Input type="range" placeholder="Range" />
          </div>
        ),
      },
      {
        title: "File Uploader",
        component: <FileUploader />,
      },
      {
        title: "Date Pickers",
        component: (
          <div className="grid grid-cols-3 gap-4">
            <DateTimePicker value={new Date(2025, 1, 1, 12, 0, 0)} onChange={() => {}} />
            <DateTimeInput value={new Date(2025, 1, 1, 12, 0, 0)} onChange={() => {}} />
            <SimpleTimePicker value={new Date(2025, 1, 1, 12, 0, 0)} onChange={() => {}} />
            <DatePicker mode="monthYear" />
          </div>
        ),
      },
    ],
  },
  toast: {
    title: "Toast",
    description: "Toast component",
    variants: [
      {
        title: "Variants",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <ToastButton toastProps={{ title: "Hello", description: "World" }}>Default</ToastButton>
            <ToastButton
              toastProps={{
                title: "Hello",
                description: "World",
                closeButton: false,
                action: (
                  <ToastAction altText="Dismiss" onClick={() => {}}>
                    Dismiss
                  </ToastAction>
                ),
              }}
            >
              Action
            </ToastButton>
            <ToastButton toastProps={{ title: "Hello", description: "World", variant: "destructive" }}>
              Destructive
            </ToastButton>
          </div>
        ),
      },
    ],
  },
  ctaBadge: {
    title: "CTA Badge",
    description: "Call-to-action component with link",
    variants: [
      {
        title: "Default CTA Badge",
        component: <CTABadge intro="Get started" main="for free" link="/login" />,
      },
    ],
  },
};

export default function Test() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b pb-6">
          <h1 className="text-3xl font-bold">Design System</h1>
          <p className="mt-2">Component library and style guide</p>
        </div>

        {/* Map over components */}
        {Object.entries(components).map(([key, component]) => (
          <section key={key} className="space-y-6">
            <div className="border-bpb-2">
              <h2 className="text-2xl font-semibold">{component.title}</h2>
              <p className="text-sm 0 mt-1">{component.description}</p>
            </div>

            <div className="grid gap-8">
              {component.variants.map((variant, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-sm font-medium">{variant.title}</h3>
                  {typeof variant.component === "function" ? variant.component() : variant.component}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
