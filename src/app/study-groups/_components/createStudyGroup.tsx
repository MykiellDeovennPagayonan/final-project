"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import getUserInfo from "@/utils/getUserInfo";

export const StudyGroupCreate: FC = () => {
  const router = useRouter();

  const [studyGroupName, setStudyGroupName] = useState<string>("");
  const [studyGroupDescription, setStudyGroupDescription] = useState<string>("");

  async function createStudyGroup() {
    const userInfo = getUserInfo()
    const userId = userInfo.id

    try {
      console.log("creating...");
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studyGroupName: studyGroupName,
          studyGroupDescription: studyGroupDescription,
          userId: userId
        }),
      });
      if (!response.ok && response.status === 401) {
        router.push("/login");
      }

      const responseBody = await response.json();
      const studyGroupId = responseBody.body

      router.push(`/study-groups/${studyGroupId}`)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="mt-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create New Study Group</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] py-10">
          <DialogHeader>
            <DialogTitle>Create Study Group</DialogTitle>
            <div className="grid gap-1">
              <div className="my-1">
                <Label htmlFor="group-name" className="text-right ">
                  Group Name
                </Label>
                <Input
                  id="group-name"
                  placeholder="Group Name"
                  value={studyGroupName}
                  onChange={(e) => setStudyGroupName(e.target.value)}
                />
              </div>
              <div className="my-1">
                <Label htmlFor="group-description" className="text-right">
                  Group Description
                </Label>
                <Textarea
                  className="resize-none p-2 overflow-y-clip hover:overflow-y-visible"
                  id="group-description"
                  placeholder="Group Description"
                  value={studyGroupDescription}
                  onChange={(e) => setStudyGroupDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogClose asChild>
              <Button type="button" onClick={() => createStudyGroup()}>
                Create Study Group
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
