import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="w-full p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>CV Settings</CardTitle>
          <CardDescription>Configure your CV layout and appearance</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add settings content here */}
          <div className="space-y-4">
            <p>Settings coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
