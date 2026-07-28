import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  Sparkles,
  Building2,
  Users,
  Search,
  Filter,
  Send,
  Plus,
  Zap,
  Award,
  ChevronRight,
  FileText,
  X,
  ShieldCheck
} from 'lucide-react';
import { JobListing, JobType, UserProfile } from '../types';

interface JobMarketProps {
  jobs: JobListing[];
  currentUser: UserProfile;
  onApplyJob: (jobId: string) => void;
  onPostJob: (newJob: JobListing) => void;
}

export const JobMarket: React.FC<JobMarketProps> = ({
  jobs,
  currentUser,
  onApplyJob,
  onPostJob
}) => {
  const [selectedType, setSelectedType] = useState<JobType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [applyCoverNote, setApplyCoverNote] = useState('');
  const [showApplySuccess, setShowApplySuccess] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

  // New Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newType, setNewType] = useState<JobType>('QUICK_GIG');
  const [newSalary, setNewSalary] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newMinRating, setNewMinRating] = useState<number>(4.0);

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    if (selectedType !== 'ALL' && job.type !== selectedType) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.companyName.toLowerCase().includes(q);
      const matchSkills = job.skillsRequired.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchSkills) return false;
    }
    return true;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    onApplyJob(selectedJob.id);
    setShowApplySuccess(true);
    setTimeout(() => {
      setShowApplySuccess(false);
      setSelectedJob(null);
      setApplyCoverNote('');
    }, 2500);
  };

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const createdJob: JobListing = {
      id: `job_${Date.now()}`,
      title: newTitle.trim(),
      companyName: newCompany.trim(),
      poster: currentUser,
      location: 'Oakridge Sector 4 (Nearby)',
      distanceKm: 0.5,
      type: newType,
      salaryRange: newSalary || '$25 - $30 / hr',
      skillsRequired: newSkills.split(',').map((s) => s.trim()).filter(Boolean),
      description: newDescription.trim() || 'Exciting local opportunity with community impact.',
      postedAt: 'Just now',
      applicantsCount: 0,
      minSocialRatingRequired: newMinRating,
      perks: ['Karma Points Bonus', 'Verified Experience Certificate', 'Flexible Hours']
    };

    onPostJob(createdJob);
    setShowCreateJobModal(false);
    // Reset
    setNewTitle('');
    setNewCompany('');
    setNewSalary('');
    setNewSkills('');
    setNewDescription('');
  };

  return (
    <div className="space-y-6">
      {/* LinkedIn Style Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-300 text-xs font-extrabold uppercase tracking-wider border border-white/10">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>KarmaWork • Youth Professional & Gig Network</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Monetize Your Skills with Local Gigs & Verified Reputation
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Find flexible local jobs, tech assistance gigs, and paid volunteer stipends. Postings prioritize applicants with high Social Ratings and verified Karma Badges!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowCreateJobModal(true)}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Post a Job / Gig</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, skills (e.g. WiFi, Tutor, Courier)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Job Type Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: 'ALL', label: 'All Openings' },
              { id: 'QUICK_GIG', label: '⚡ Quick Gigs' },
              { id: 'PART_TIME', label: 'Part-Time' },
              { id: 'FULL_TIME', label: 'Full-Time' },
              { id: 'STIPEND_VOLUNTEER', label: '💚 Paid Volunteer' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedType === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredJobs.map((job) => {
          const meetsRating =
            !job.minSocialRatingRequired ||
            currentUser.socialRating >= job.minSocialRatingRequired;

          return (
            <div
              key={job.id}
              className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 shadow-xs transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={job.poster.avatar}
                      alt={job.poster.name}
                      className="w-11 h-11 rounded-2xl object-cover ring-2 ring-indigo-100 shrink-0"
                    />
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm leading-snug hover:text-indigo-600 cursor-pointer">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.companyName}</span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{job.poster.socialRating}★</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-black bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100 shrink-0">
                    {job.type.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2">
                  {job.description}
                </p>

                {/* Salary & Location Info */}
                <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                  <span className="font-mono font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{job.salaryRange}</span>
                  </span>

                  <span className="text-slate-500 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{job.location}</span>
                  </span>

                  <span className="text-slate-400 text-[11px]">Posted {job.postedAt}</span>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skillsRequired.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Rating Requirement Warning */}
                {job.minSocialRatingRequired && (
                  <div
                    className={`p-2 rounded-xl text-[11px] font-bold flex items-center gap-1.5 ${
                      meetsRating
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      Requires {job.minSocialRatingRequired}★ Social Rating • Your Rating:{' '}
                      {currentUser.socialRating}★ {meetsRating ? '(Qualified ✓)' : '(Needs Rating Boost)'}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.applicantsCount} local applicants</span>
                </span>

                {job.isApplied ? (
                  <button
                    disabled
                    className="bg-emerald-50 text-emerald-700 font-bold px-4 py-2 rounded-xl text-xs border border-emerald-200 flex items-center gap-1 cursor-default"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Application Submitted</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-xs transition flex items-center gap-1.5 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Easy Apply</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Easy Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Easy Apply for {selectedJob.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedJob.companyName} • {selectedJob.salaryRange}
                </p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {showApplySuccess ? (
              <div className="py-8 text-center space-y-3 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h4 className="font-extrabold text-lg text-slate-900">Application Sent!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your KindGrid profile, 5-star Social Rating ({currentUser.socialRating}★), and Karma badges have been submitted to {selectedJob.companyName}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                {/* Profile Card Preview */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-200"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{currentUser.name}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-600">
                      <span className="text-amber-500 font-bold">★ {currentUser.socialRating}</span>
                      <span>• {currentUser.karmaLevel}</span>
                      <span>• {currentUser.totalReviews} Reviews</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Short Cover Note / Availability
                  </label>
                  <textarea
                    value={applyCoverNote}
                    onChange={(e) => setApplyCoverNote(e.target.value)}
                    rows={3}
                    placeholder="Introduce yourself, mention relevant skills or availability..."
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 text-xs text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-5 py-2 rounded-xl text-xs shadow-md transition"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Post a Job Modal */}
      {showCreateJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <span>Post a Local Job or Youth Gig</span>
              </h3>
              <button
                onClick={() => setShowCreateJobModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateJobSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. WiFi Setup Assistant or E-Bike Delivery Runner"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company / Hub Name</label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Sector 4 Co-Op"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Job Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as JobType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
                  >
                    <option value="QUICK_GIG">⚡ Quick Gig</option>
                    <option value="PART_TIME">Part-Time</option>
                    <option value="FULL_TIME">Full-Time</option>
                    <option value="STIPEND_VOLUNTEER">💚 Paid Volunteer Stipend</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salary / Hourly Rate</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="e.g. $25 - $30 / hr"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min Social Rating Req.</label>
                  <select
                    value={newMinRating}
                    onChange={(e) => setNewMinRating(parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
                  >
                    <option value={4.0}>4.0★ (Standard)</option>
                    <option value={4.5}>4.5★ (High Trust)</option>
                    <option value={4.8}>4.8★ (Top Samaritan Only)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Skills Required (comma separated)</label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="e.g. E-Bike Riding, First Aid, Patience"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  placeholder="Provide job details, hours, and expectations..."
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateJobModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-5 py-2 rounded-xl shadow-md transition"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
