"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Image, 
  MessageSquare, 
  Code, 
  Sparkles, 
  Plus, 
  X,
  Eye,
  Coins,
  FileText,
  Tag,
  DollarSign
} from 'lucide-react';
import { useWeb3 } from '@/components/web3-provider';
import { useToast } from '@/hooks/use-toast';

const categories = [
  'Social Media',
  'Content Marketing',
  'SEO',
  'E-commerce',
  'Programming',
  'Design',
  'Architecture',
  'Gaming',
  'Education',
  'Business',
  'Creative Writing',
  'Data Analysis'
];

const promptTypes = [
  { value: 'chatgpt', label: 'ChatGPT', icon: MessageSquare },
  { value: 'midjourney', label: 'Midjourney', icon: Image },
  { value: 'dalle', label: 'DALL-E', icon: Sparkles },
  { value: 'claude', label: 'Claude', icon: MessageSquare },
  { value: 'code', label: 'Code Assistant', icon: Code },
  { value: 'custom', label: 'Custom', icon: FileText }
];

export function UploadForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    price: '',
    tags: [] as string[],
    promptContent: '',
    sampleOutput: '',
    instructions: ''
  });
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected, account } = useWeb3();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        tags: [...prev.tags, newTag.trim()] 
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to upload prompts.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send prompt data to backend with creator address
      const res = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          creator: account,
          content: formData.promptContent,
          preview: formData.promptContent.slice(0, 500) // or another preview logic
        })
      });
      if (!res.ok) throw new Error('Failed to upload prompt');

      toast({
        title: "Prompt uploaded successfully!",
        description: "Your prompt is now live on the marketplace.",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        type: '',
        price: '',
        tags: [],
        promptContent: '',
        sampleOutput: '',
        instructions: ''
      });
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your prompt.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (type: string) => {
    const promptType = promptTypes.find(t => t.value === type);
    if (promptType) {
      const Icon = promptType.icon;
      return <Icon className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Basic Information
        </h2>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-base font-medium">
              Prompt Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Professional LinkedIn Post Generator"
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-base font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what your prompt does and what makes it valuable..."
              className="mt-2 min-h-[100px]"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category" className="text-base font-medium">
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type" className="text-base font-medium">
                Prompt Type *
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select prompt type" />
                </SelectTrigger>
                <SelectContent>
                  {promptTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="price" className="text-base font-medium">
              Price (PROMPT tokens) *
            </Label>
            <div className="relative mt-2">
              <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="15"
                className="pl-10"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tags" className="text-base font-medium">
              Tags
            </Label>
            <div className="mt-2 space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Prompt Content */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Prompt Content
        </h2>

        <div className="space-y-6">
          <div>
            <Label htmlFor="promptContent" className="text-base font-medium">
              Full Prompt *
            </Label>
            <Textarea
              id="promptContent"
              value={formData.promptContent}
              onChange={(e) => handleInputChange('promptContent', e.target.value)}
              placeholder="Enter your complete prompt here..."
              className="mt-2 min-h-[200px] font-mono text-sm"
              required
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              This is the full prompt that buyers will receive. Be detailed and include all necessary instructions.
            </p>
          </div>

          <div>
            <Label htmlFor="sampleOutput" className="text-base font-medium">
              Sample Output
            </Label>
            <Textarea
              id="sampleOutput"
              value={formData.sampleOutput}
              onChange={(e) => handleInputChange('sampleOutput', e.target.value)}
              placeholder="Paste an example output generated by your prompt..."
              className="mt-2 min-h-[150px]"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Show potential buyers what kind of output they can expect from your prompt.
            </p>
          </div>

          <div>
            <Label htmlFor="instructions" className="text-base font-medium">
              Usage Instructions
            </Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              placeholder="Provide any additional instructions for using the prompt effectively..."
              className="mt-2 min-h-[100px]"
            />
          </div>
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Preview
        </h2>
        
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              {formData.type && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {getTypeIcon(formData.type)}
                  {promptTypes.find(t => t.value === formData.type)?.label}
                </Badge>
              )}
              {formData.category && (
                <Badge variant="outline">{formData.category}</Badge>
              )}
            </div>
            {formData.price && (
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Coins className="w-4 h-4" />
                {formData.price}
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {formData.title || 'Your Prompt Title'}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {formData.description || 'Your prompt description will appear here...'}
          </p>

          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Submit */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" disabled={isSubmitting}>
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button 
          type="submit" 
          disabled={!isConnected || isSubmitting}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Prompt
            </>
          )}
        </Button>
      </div>
    </form>
  );
}