"use client"

import { FC, useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface TopicSelectorProps {
  topics: Array<Topic>
  setTopicSelected: React.Dispatch<React.SetStateAction<Topic>>
  topicSelected: Topic
  topicsList: Array<Topic>
}

const TopicSelector: FC<TopicSelectorProps> = ({ topics, setTopicSelected, topicSelected, topicsList }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [availableTopics, setAvailableTopics] = useState<Array<Topic>>([])

  function filtertopics() {
    const filteredTopics = topics.filter((topic) => !topicsList.includes(topic))
    setAvailableTopics(filteredTopics)
  }

  useEffect(() => {
    filtertopics()
  }, [topicsList, topics])

  return (
    <div className="ml-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {topicSelected
              ? topicSelected?.name
              : "Select topic..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search topic..." />
            <CommandEmpty>No topic found.</CommandEmpty>
            <CommandGroup>
              {availableTopics.map((topic) => (
                <CommandItem
                  key={topic.name}
                  value={topic.name}
                  onSelect={(currentValue) => {
                    setTopicSelected(currentValue === topicSelected?.name ? {name: "hi", id: 0} : topic)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      topicSelected === topic ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {topic.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default TopicSelector