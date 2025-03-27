import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateWebsiteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (url: string | null) => void;
}) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (isOpen) {
      setUrl("");
    }
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl rounded-2xl border border-gray-700 w-full max-w-md transition-transform hover:scale-[1.02]">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Add New Website
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Website URL
            </label>
            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => onClose(null)}
              className="text-gray-400 border-gray-600 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => onClose(url)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Website
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
