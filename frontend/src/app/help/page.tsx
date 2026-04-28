'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create a new task?',
          a: 'Click the "New Task" button on the dashboard or navigate to Tasks > New Task. Fill in the title, description, and select a status, then click "Create Task".'
        },
        {
          q: 'How do I edit a task?',
          a: 'Click on any task card to view its details, then click the "Edit Task" button. Make your changes and click "Save Changes".'
        },
        {
          q: 'How do I delete a task?',
          a: 'Open the task details page and click the "Delete Task" button. Confirm the deletion when prompted.'
        }
      ]
    },
    {
      category: 'Task Management',
      questions: [
        {
          q: 'What are the different task statuses?',
          a: 'Tasks can have three statuses: Pending (not started), In Progress (currently working on), and Completed (finished).'
        },
        {
          q: 'How do I filter tasks?',
          a: 'Use the filter buttons on the dashboard to view tasks by status: All, Pending, In Progress, or Completed.'
        },
        {
          q: 'Can I mark a task as complete quickly?',
          a: 'Yes! Open the task details and click "Mark Complete". You can also mark it incomplete the same way.'
        }
      ]
    },
    {
      category: 'Account',
      questions: [
        {
          q: 'How do I view my profile?',
          a: 'Click on your profile picture in the top right corner and select "Profile" from the dropdown menu.'
        },
        {
          q: 'How do I change my password?',
          a: 'Currently, password changes are not available. This feature will be added in a future update.'
        },
        {
          q: 'How do I logout?',
          a: 'Click on your profile picture in the top right corner and select "Logout" from the dropdown menu.'
        }
      ]
    },
    {
      category: 'Features',
      questions: [
        {
          q: 'Does TaskFlow support dark mode?',
          a: 'Yes! Click the moon/sun icon in the top right corner to toggle between light and dark mode.'
        },
        {
          q: 'Is TaskFlow mobile-friendly?',
          a: 'Absolutely! TaskFlow is fully responsive and works great on mobile phones, tablets, and desktops.'
        },
        {
          q: 'Can I see task statistics?',
          a: 'Yes! The dashboard shows your total tasks, pending, in progress, and completed counts at the top.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 container-padding section-spacing">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Help Center</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Find answers to common questions</p>
            </div>

            {/* Search */}
            <div className="mb-6 sm:mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-premium pl-10"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Link href="/tasks/new" className="glass-card card-padding hover:shadow-lg transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">New Task</p>
                    <p className="text-xs text-muted-foreground">Create task</p>
                  </div>
                </div>
              </Link>

              <Link href="/profile" className="glass-card card-padding hover:shadow-lg transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Profile</p>
                    <p className="text-xs text-muted-foreground">View profile</p>
                  </div>
                </div>
              </Link>

              <Link href="/" className="glass-card card-padding hover:shadow-lg transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Dashboard</p>
                    <p className="text-xs text-muted-foreground">Go home</p>
                  </div>
                </div>
              </Link>

              <Link href="/tasks" className="glass-card card-padding hover:shadow-lg transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">All Tasks</p>
                    <p className="text-xs text-muted-foreground">View tasks</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* FAQs */}
            <div className="space-y-6 sm:space-y-8">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((category, idx) => (
                  <div key={idx}>
                    <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">{category.category}</h2>
                    <div className="space-y-3 sm:space-y-4">
                      {category.questions.map((item, qIdx) => (
                        <div key={qIdx} className="glass-card card-padding">
                          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">{item.q}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-card card-padding text-center py-12">
                  <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
                  <p className="text-sm text-muted-foreground">Try searching with different keywords</p>
                </div>
              )}
            </div>

            {/* Contact Support */}
            <div className="mt-8 sm:mt-12 glass-card card-padding text-center">
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">Still need help?</h2>
              <p className="text-sm text-muted-foreground mb-4">Can't find what you're looking for? We're here to help!</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="mailto:support@taskflow.com" className="btn-premium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Support
                </a>
                <Link href="/" className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base bg-secondary text-foreground hover:bg-secondary/80 transition-all">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
