import {
  cottages, activities, inquiries, testimonials,
  type Cottage, type InsertCottage,
  type Activity, type InsertActivity,
  type Inquiry, type InsertInquiry,
  type Testimonial, type InsertTestimonial
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Cottages
  getCottages(): Promise<Cottage[]>;
  getCottage(id: number): Promise<Cottage | undefined>;
  createCottage(cottage: InsertCottage): Promise<Cottage>;

  // Clear static content (Cottages/Activities)
  clearStaticContent(): Promise<void>;

  // Activities
  getActivities(): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;

  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class DatabaseStorage implements IStorage {
  async clearStaticContent(): Promise<void> {
    await db.delete(cottages);
    await db.delete(activities);
  }

  async getCottages(): Promise<Cottage[]> {
    return await db.select().from(cottages);
  }

  async getCottage(id: number): Promise<Cottage | undefined> {
    const [cottage] = await db.select().from(cottages).where(eq(cottages.id, id));
    return cottage;
  }

  async createCottage(insertCottage: InsertCottage): Promise<Cottage> {
    const [cottage] = await db.insert(cottages).values(insertCottage).returning();
    return cottage;
  }

  async getActivities(): Promise<Activity[]> {
    return await db.select().from(activities);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const [activity] = await db.insert(activities).values(insertActivity).returning();
    return activity;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }
}

export class MemStorage implements IStorage {
  private cottages: Map<number, Cottage>;
  private activities: Map<number, Activity>;
  private inquiries: Map<number, Inquiry>;
  private testimonials: Map<number, Testimonial>;
  private currentCottageId: number;
  private currentActivityId: number;
  private currentInquiryId: number;
  private currentTestimonialId: number;

  constructor() {
    this.cottages = new Map();
    this.activities = new Map();
    this.inquiries = new Map();
    this.testimonials = new Map();
    this.currentCottageId = 1;
    this.currentActivityId = 1;
    this.currentInquiryId = 1;
    this.currentTestimonialId = 1;
  }

  async clearStaticContent(): Promise<void> {
    this.cottages.clear();
    this.activities.clear();
    this.currentCottageId = 1;
    this.currentActivityId = 1;
  }

  async getCottages(): Promise<Cottage[]> {
    return Array.from(this.cottages.values());
  }

  async getCottage(id: number): Promise<Cottage | undefined> {
    return this.cottages.get(id);
  }

  async createCottage(insertCottage: InsertCottage): Promise<Cottage> {
    const id = this.currentCottageId++;
    const cottage: Cottage = {
      ...insertCottage,
      id,
      images: insertCottage.images ?? null,
      features: insertCottage.features ?? null
    };
    this.cottages.set(id, cottage);
    return cottage;
  }

  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const activity: Activity = {
      ...insertActivity,
      id,
      images: insertActivity.images ?? null
    };
    this.activities.set(id, activity);
    return activity;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date(),
      phone: insertInquiry.phone ?? null,
      checkIn: insertInquiry.checkIn ?? null,
      checkOut: insertInquiry.checkOut ?? null,
      guests: insertInquiry.guests ?? null
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      rating: insertTestimonial.rating ?? null,
      location: insertTestimonial.location ?? null
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
