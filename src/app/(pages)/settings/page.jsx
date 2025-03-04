"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./style.scss";
import Notifications from "@/components/notifications";
import SalesTaxComp from "@/components/setSalesTax";
import Picklist from "@/components/picklist";
function SettingsPage() {
  return (
    <section className="p-5">
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="cus-tab-wrap">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="tax">Sales Tax</TabsTrigger>
          <TabsTrigger value="picklist">Picklist</TabsTrigger>
        </TabsList>
        <TabsContent value="notifications">
          <Notifications />
        </TabsContent>
        <TabsContent value="tax">
          <SalesTaxComp />
        </TabsContent>
        <TabsContent value="picklist">
          <Picklist />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default SettingsPage;
