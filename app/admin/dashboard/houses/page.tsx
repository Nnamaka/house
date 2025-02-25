"use client";

import { useEffect, useState } from "react";
// import housesData from "@/data/houses";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Loader, Trash2, Plus,  X  } from "lucide-react";
// import { features } from "process";

// new
interface HouseSection {
  name: string;
  features: string[];
}


interface House {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  sections: HouseSection[]; // new
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  dimension: string;
}

export default function HousesPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [newHouse, setNewHouse] = useState({
    title: "",
    price: "",
    description: "",
    images: [] as string[],
    features: "",
    sections: [] as HouseSection[], // new
    bedrooms: 0,
    bathrooms: 0,
    sleeps: 0,
    dimension: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tempUploadedImages, setTempUploadedImages] = useState<string[]>([]);

  // new
  const [ newSection, setNewSection ] = useState({
    name: "",
    featuresInput: "",
  })

  useEffect(() => {
    const fetchHouses = async () => {
      const res = await fetch("/api/houses", {
        method: "GET", // Explicitly specify GET (not needed)
      });
      const data = await res.json();
      setHouses(data);
    };
    fetchHouses();
  }, []);

  useEffect(() => {
    const handleCleanup = async () => {
      if (isCreating) return; // Prevent deletion if house is being created

      if (!isOpen && tempUploadedImages.length > 0) {
        console.log("deleting images");
        await Promise.all(
          tempUploadedImages.map(async (imageUrl) => {
            const fileName = imageUrl.split("/").pop();
            if (fileName) {
              await supabase.storage.from("house").remove([fileName]);
            }
          })
        );
        setTempUploadedImages([]);
      }

      setNewHouse({
        title: "",
        price: "",
        description: "",
        images: [],
        features: "",
        sections: [], // new
        bedrooms: 0,
        bathrooms: 0,
        sleeps: 0,
        dimension: "",
      });
    };
    if (!isOpen) {
      handleCleanup();
    }
  }, [isOpen, isCreating, tempUploadedImages]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === "number"
        ? parseFloat(e.target.value) || 0
        : e.target.value;
    setNewHouse({ ...newHouse, [e.target.name]: value });
  };

  // new
  const handleSectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSection({ ...newSection, [e.target.name]: e.target.value});
  }

  const handleAddSection = () => {
    if (!newSection.name.trim()) return;
    
    const features = newSection.featuresInput
      .split(',')
      .map(feature => feature.trim())
      .filter(feature => feature !== '');
    
    const section: HouseSection = {
      name: newSection.name.trim(),
      features,
    };
    
    setNewHouse({
      ...newHouse,
      sections: [...newHouse.sections, section],
    });
    
    // Reset form
    setNewSection({ name: "", featuresInput: "" });
  };

  // Remove a section
  const handleRemoveSection = (index: number) => {
    const updatedSections = [...newHouse.sections];
    updatedSections.splice(index, 1);
    setNewHouse({ ...newHouse, sections: updatedSections });
  };

  // Handle selected house section changes
  const handleSelectedHouseSectionChange = (
    sectionIndex: number,
    field: 'name' | 'features',
    value: string | string[]
  ) => {
    if (!selectedHouse) return;
    
    const updatedSections = [...selectedHouse.sections];
    
    if (field === 'name') {
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        name: value as string,
      };
    } else if (field === 'features') {
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        features: typeof value === 'string' 
          ? (value as string).split(',').map(f => f.trim()).filter(f => f !== '')
          : value as string[],
      };
    }
    
    setSelectedHouse({
      ...selectedHouse,
      sections: updatedSections,
    });
  };

  // Add section to selected house
  const handleAddSectionToSelected = () => {
    if (!selectedHouse || !newSection.name.trim()) return;
    
    const features = newSection.featuresInput
      .split(',')
      .map(feature => feature.trim())
      .filter(feature => feature !== '');
    
    const section: HouseSection = {
      name: newSection.name.trim(),
      features,
    };
    
    setSelectedHouse({
      ...selectedHouse,
      sections: [...(selectedHouse.sections || []), section],
    });
    
    // Reset form
    setNewSection({ name: "", featuresInput: "" });
  };

  // Remove section from selected house
  const handleRemoveSectionFromSelected = (index: number) => {
    if (!selectedHouse) return;
    
    const updatedSections = [...selectedHouse.sections];
    updatedSections.splice(index, 1);
    
    setSelectedHouse({
      ...selectedHouse,
      sections: updatedSections,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsUploading(true);
      const files = Array.from(e.target.files);
      const uploadedUrls: string[] = [];

      try {
        for (const file of files) {
          const fileName = `${crypto.randomUUID()}-${file.name.replace(
            /\s/g,
            "_"
          )}`;
          console.log("uploading to supabase");
          const { error } = await supabase.storage
            .from("house")
            .upload(fileName, file);

          if (error) {
            console.error("Upload error:", error);
          } else {
            const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/house/${fileName}`;
            uploadedUrls.push(publicUrl);
          }
        }

        // track these as temporary upload
        setTempUploadedImages((prev) => [...prev, ...uploadedUrls]);
        const target = selectedHouse ? selectedHouse : newHouse;
        const updatedImages = [...target.images, ...uploadedUrls];

        if (selectedHouse) {
          setSelectedHouse({ ...selectedHouse, images: updatedImages });
        } else {
          setNewHouse({ ...newHouse, images: updatedImages });
        }

        setNewHouse({
          ...newHouse,
          images: [...newHouse.images, ...uploadedUrls],
        });
      } catch (error) {
        console.error("Error uploading images", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleCreateHouse = async () => {
    if (!newHouse.title || !newHouse.price) return;
    setIsCreating(true);

    // for the api
    try {
      console.log("Posting house...");
      const res = await fetch("/api/houses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newHouse,
          price: parseFloat(newHouse.price),
          features: newHouse.features.split(",").map((f) => f.trim()),
          sections: newHouse.sections // new
        }),
      });

      if (res.ok) {
        const createdHouse = await res.json();
        setHouses([...houses, createdHouse]);

        // Clear temporary uploads as they're now properly associated with a house
        setTempUploadedImages([]);
        setNewHouse({
          title: "",
          price: "",
          description: "",
          images: [],
          features: "",
          sections: [], //new
          bedrooms: 0,
          bathrooms: 0,
          sleeps: 0,
          dimension: "",
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.log("Error creating house: ", error);
    } finally {
      setIsCreating(false);
      // setIsOpen(false);
    }
  };

  const handleClickHouse = (house: House) => {
    // new
    const sectionsArray = house.sections || [];

    setSelectedHouse({
      ...house,
      features: [...house.features], // Ensure it stays an array
      sections: sectionsArray, // new
    });
  };

  const handleDeleteHouse = async () => {
    if (!selectedHouse) return;
    setIsDeleting(true);

    try {
      for (const imageUrl of selectedHouse.images) {
        // Extract filename from the URL
        const fileName = imageUrl.split("/").pop();
        if (fileName) {
          const { error } = await supabase.storage
            .from("house")
            .remove([fileName]);

          if (error) {
            console.error("Error deleting image from storage:", error);
            // Continue with other deletions even if one fails
          }
        }
      }

      const res = await fetch(`/api/houses/${selectedHouse.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setHouses(houses.filter((house) => house.id !== selectedHouse.id));
        setSelectedHouse(null);
      }
    } catch (error) {
      console.error("Error deleting house: ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!selectedHouse) return;
    setIsSaving(true);

    try {
      const updatedHouse = {
        ...selectedHouse,
        features: selectedHouse.features.map((f) => f.trim()), // Ensure array type
        sections: selectedHouse.sections || [] // new
      };

      const res = await fetch(`/api/houses/${selectedHouse.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedHouse),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setHouses(
          houses.map((house) =>
            house.id === selectedHouse.id ? updatedHouse : house
          )
        );
        setSelectedHouse(null);
      }
    } catch (error) {
      console.error("Error saving changes: ", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteImage = async (imageUrl: string, houseId: string) => {
    // Extract filename from the URL
    const fileName = imageUrl.split("/").pop();
    if (!fileName) return;

    try {
      // Delete from Supabase storage
      const { error } = await supabase.storage.from("house").remove([fileName]);

      if (error) {
        console.error("Error deleting from storage:", error);
        return;
      }

      // Update the house in your database
      const updatedHouse = {
        ...selectedHouse!,
        images: selectedHouse!.images.filter((img) => img !== imageUrl),
      };

      const res = await fetch(`/api/houses/${houseId}`, {
        method: "PUT",
        body: JSON.stringify(updatedHouse),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        // Update local state
        setSelectedHouse(updatedHouse);
        setHouses(
          houses.map((house) => (house.id === houseId ? updatedHouse : house))
        );
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Houses</h1>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsOpen(false);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button className="mb-4" onClick={() => setIsOpen(true)}>
            Create New House
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New House</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pr-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={newHouse.title}
                onChange={handleChange}
                placeholder="House title"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={newHouse.description}
                onChange={handleChange}
                placeholder="Describe the house"
              />
            </div>

            <div>
              <Label>Price ($)</Label>
              <Input
                type="number"
                name="price"
                value={newHouse.price}
                onChange={handleChange}
                placeholder="House price"
              />
            </div>

            <div>
              <Label>Features (comma separated)</Label>
              <Input
                type="text"
                name="features"
                value={newHouse.features}
                onChange={handleChange}
                placeholder="e.g., Solar Panels, 2 Beds, Smart Home"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex justify-between items-center">
                <span>House Sections</span>
              </Label>
            {/* New */}
            {/* Sections of the house */}
            {newHouse.sections.length > 0 && (
                <div className="border rounded-md p-3 mb-3 space-y-3">
                  {newHouse.sections.map((section, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded relative">
                      <h4 className="font-medium">{section.name}</h4>
                      <p className="text-sm text-gray-600">
                        {section.features.join(', ')}
                      </p>
                      <button 
                        onClick={() => handleRemoveSection(idx)}
                        className="absolute top-2 right-2 text-red-500"
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="border rounded-md p-3 space-y-2">
                <div>
                  <Label className="text-sm">Section Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={newSection.name}
                    onChange={handleSectionChange}
                    placeholder="e.g., Kitchen, Bathroom, Bedroom"
                  />
                </div>
                <div>
                  <Label className="text-sm">Features (comma separated)</Label>
                  <Input
                    type="text"
                    name="featuresInput"
                    value={newSection.featuresInput}
                    onChange={handleSectionChange}
                    placeholder="e.g., Gas Cooker, Heater, Cabinets"
                  />
                </div>
                <Button 
                  type="button" 
                  onClick={handleAddSection}
                  className="w-full"
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Section
                </Button>
              </div>
            </div>
            
            <div>
              <Label>Bedrooms</Label>
              <Input
                name="bedrooms"
                type="number"
                value={newHouse.bedrooms}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Bathrooms</Label>
              <Input
                name="bathrooms"
                type="number"
                value={newHouse.bathrooms}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Sleeps</Label>
              <Input
                name="sleeps"
                type="number"
                value={newHouse.sleeps}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Dimension</Label>
              <Textarea
                name="dimension"
                value={newHouse.dimension}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Upload Images</Label>
              <div className="relative">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {isUploading && (
                  <div className="absolute right-2 top-2">
                    <Loader className="w-5 h-5 animate-spin" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-2">
                {newHouse.images
                  ? newHouse.images.map((src, index) => (
                      <Image
                        key={index}
                        src={src}
                        width={160} // Example: Set the actual width of your image
                        height={160}
                        alt="House Preview"
                        className="w-full h-16 object-cover rounded-lg"
                        unoptimized={true}
                      />
                    ))
                  : []}
              </div>
            </div>

            <Button
              onClick={handleCreateHouse}
              disabled={isCreating}
              className="w-full"
            >
              {isCreating ? (
                <Loader className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {isCreating ? "Creating..." : "Create House"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ul className="space-y-4">
        {houses.map((house) => (
          <li
            key={house.id}
            className="p-4 bg-white shadow rounded-lg cursor-pointer"
            onClick={() => handleClickHouse(house)}
          >
            <h3 className="text-lg font-semibold">{house.title}</h3>
            <p>Price: ${house.price.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{house.description}</p>
            {house.sections && house.sections.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Sections:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {house.sections.map((section, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {section.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 mt-2">
              {house.images?.slice(0, 3).map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  width={160} // Example: Set the actual width of your image
                  height={160}
                  alt={house.title}
                  loading="lazy"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
      {selectedHouse && (
        <Dialog
          open={!!selectedHouse}
          onOpenChange={() => setSelectedHouse(null)}
        >
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit House</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pr-4">
              <div>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={selectedHouse?.title || ""}
                  onChange={(e) =>
                    setSelectedHouse({
                      ...selectedHouse,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  value={selectedHouse.price}
                  onChange={(e) =>
                    setSelectedHouse({
                      ...selectedHouse,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={selectedHouse?.description || ""}
                  onChange={(e) =>
                    setSelectedHouse({
                      ...selectedHouse,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Features (comma separated)</Label>
                <Input
                  type="text"
                  value={
                    Array.isArray(selectedHouse?.features)
                      ? selectedHouse.features.join(", ")
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedHouse({
                      ...selectedHouse,
                      features: e.target.value.split(",").map((f) => f.trim()),
                    })
                  }
                />
              </div>

              {/* New Edit Sections */}
              <div className="space-y-2">
                <Label className="flex justify-between items-center">
                  <span>House Sections</span>
                </Label>
                
                {/* List of existing sections */}
                {selectedHouse.sections && selectedHouse.sections.length > 0 && (
                  <div className="border rounded-md p-3 mb-3 space-y-3">
                    {selectedHouse.sections.map((section, idx) => (
                      <div key={idx} className="p-2 bg-gray-50 rounded relative">
                        <Input
                          className="mb-1"
                          value={section.name}
                          onChange={(e) => 
                            handleSelectedHouseSectionChange(idx, 'name', e.target.value)
                          }
                        />
                        <Input
                          value={section.features.join(', ')}
                          onChange={(e) => 
                            handleSelectedHouseSectionChange(idx, 'features', e.target.value)
                          }
                          placeholder="Features (comma separated)"
                        />
                        <button 
                          onClick={() => handleRemoveSectionFromSelected(idx)}
                          className="absolute top-2 right-2 text-red-500"
                          type="button"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Form to add a new section */}
                <div className="border rounded-md p-3 space-y-2">
                  <div>
                    <Label className="text-sm">Section Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={newSection.name}
                      onChange={handleSectionChange}
                      placeholder="e.g., Kitchen, Bathroom, Bedroom"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Features (comma separated)</Label>
                    <Input
                      type="text"
                      name="featuresInput"
                      value={newSection.featuresInput}
                      onChange={handleSectionChange}
                      placeholder="e.g., Gas Cooker, Heater, Cabinets"
                    />
                  </div>
                  <Button 
                    type="button" 
                    onClick={handleAddSectionToSelected}
                    className="w-full"
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Section
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>
                  Bedrooms
                  <Input
                    name="bedrooms"
                    type="number"
                    value={selectedHouse.bedrooms}
                    onChange={(e) =>
                      setSelectedHouse({
                        ...selectedHouse,
                        bathrooms: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </Label>
              </div>
              <div>
                <Label>
                  Bathrooms
                  <Input
                    name="bathrooms"
                    type="number"
                    value={selectedHouse.bathrooms}
                    onChange={(e) =>
                      setSelectedHouse({
                        ...selectedHouse,
                        bathrooms: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </Label>
              </div>
              <div>
                <Label>
                  Dimension
                  <Input
                    name="dimension"
                    type="text"
                    value={selectedHouse.dimension}
                    onChange={(e) =>
                      setSelectedHouse({
                        ...selectedHouse,
                        dimension: e.target.value,
                      })
                    }
                  />
                </Label>
              </div>
              <div>
                <Label>
                  Sleeps
                  <Textarea
                    name="sleeps"
                    value={selectedHouse.sleeps}
                    onChange={(e) =>
                      setSelectedHouse({
                        ...selectedHouse,
                        sleeps: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </Label>
              </div>
              <div>
                <Label>Images</Label>
                <div className="mb-4 relative">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={async (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      if (e.target.files) {
                        const files = Array.from(e.target.files);
                        const uploadedUrls: string[] = [];

                        for (const file of files) {
                          const fileName = `${crypto.randomUUID()}-${file.name.replace(
                            /\s/g,
                            "_"
                          )}`;
                          const { error } = await supabase.storage
                            .from("house")
                            .upload(fileName, file);

                          if (error) {
                            console.error("Upload error:", error);
                          } else {
                            const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/house/${fileName}`;
                            uploadedUrls.push(publicUrl);
                          }
                        }

                        // Update selectedHouse with new images
                        setSelectedHouse({
                          ...selectedHouse!,
                          images: [...selectedHouse!.images, ...uploadedUrls],
                        });

                        // Update in database
                        const updatedHouse = {
                          ...selectedHouse!,
                          images: [...selectedHouse!.images, ...uploadedUrls],
                        };

                        const res = await fetch(
                          `/api/houses/${selectedHouse!.id}`,
                          {
                            method: "PUT",
                            body: JSON.stringify(updatedHouse),
                            headers: { "Content-Type": "application/json" },
                          }
                        );

                        if (res.ok) {
                          // Update houses list
                          setHouses(
                            houses.map((house) =>
                              house.id === selectedHouse!.id
                                ? updatedHouse
                                : house
                            )
                          );
                        }
                      }
                    }}
                  />
                  {isUploading && (
                    <div className="absolute right-2 top-2">
                      <Loader className="w-5 h-5 animate-spin" />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {selectedHouse.images.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={imageUrl}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt={`House image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                        unoptimized={true}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(imageUrl, selectedHouse.id);
                        }}
                        className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleSaveChanges}
                  className="bg-green-500"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {isSaving ? "Saving..." : "Save"}
                </Button>
                <Button
                  onClick={handleDeleteHouse}
                  className="bg-red-500"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
