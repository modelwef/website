import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { allCountries } from "@/data/countries"
import { committees } from "@/data/committees"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Database,
  Flag,
  LogOut,
  RefreshCcw,
  Users,
  Building2,
  UserCheck,
  Pencil,
  Check,
  X,
  ChevronDown,
} from "lucide-react"

interface ParticipantRegistration {
  id: string
  email: string
  first_name: string
  last_name: string
  delegation_type: string
  preferred_country: string | null
  preferred_institution: string | null
  committee_preference: string | null
  assigned_country: string | null
  assigned_institution: string | null
  assigned_committee: string | null
  status: string
  payment_status: string
  notes: string | null
  created_at: string
  updated_at: string
}

interface PartnershipApplication {
  id: string
  organization_name: string
  contact_person: string
  email: string
  partnership_type: string
  status: string
  message: string | null
  created_at: string
}

interface VolunteerSignup {
  id: string
  full_name: string
  email: string
  preferred_role: string
  school: string
  status: string
  experience: string | null
  created_at: string
}

const SystemDashboard = () => {
  const navigate = useNavigate()
  const getCachedData = () => {
    if (typeof window === "undefined") return null
    try {
      const cached = sessionStorage.getItem("systemDashboardData")
      return cached ? JSON.parse(cached) : null
    } catch {
      return null
    }
  }

  const getSavedColumns = (key: string) => {
    if (typeof document === "undefined") return null
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1]
    if (!cookieValue) return null
    try {
      return JSON.parse(decodeURIComponent(cookieValue)) as Record<string, boolean>
    } catch {
      return null
    }
  }

  const setColumnsCookie = (key: string, value: Record<string, boolean>) => {
    if (typeof document === "undefined") return
    document.cookie = `${key}=${encodeURIComponent(
      JSON.stringify(value)
    )}; path=/; max-age=31536000`
  }

  const cachedData = getCachedData()
  const initialAuthorized =
    typeof window !== "undefined" &&
    sessionStorage.getItem("systemDashboardAuthorized") === "true"

  const [loading, setLoading] = useState(!initialAuthorized)
  const [authorized, setAuthorized] = useState(initialAuthorized)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const [participants, setParticipants] = useState<ParticipantRegistration[]>(
    cachedData?.participants ?? []
  )
  const [partnerships, setPartnerships] = useState<PartnershipApplication[]>(
    cachedData?.partnerships ?? []
  )
  const [volunteers, setVolunteers] = useState<VolunteerSignup[]>(
    cachedData?.volunteers ?? []
  )

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    assigned_country: "",
    assigned_committee: "",
    status: "pending",
    payment_status: "",
  })

  const defaultParticipantColumns = {
    participant: true,
    delegation: true,
    preferences: true,
    assignments: true,
    status: true,
    payment: true,
    notes: true,
    created: true,
    actions: true,
  }

  const defaultPartnershipColumns = {
    organization: true,
    contact: true,
    email: true,
    type: true,
    status: true,
    message: true,
    created: true,
  }

  const defaultVolunteerColumns = {
    name: true,
    email: true,
    role: true,
    school: true,
    status: true,
    experience: true,
    created: true,
  }

  const [participantColumns, setParticipantColumns] = useState(() => ({
    ...defaultParticipantColumns,
    ...(getSavedColumns("system-participant-columns") ?? {}),
  }))

  const [partnershipColumns, setPartnershipColumns] = useState(() => ({
    ...defaultPartnershipColumns,
    ...(getSavedColumns("system-partnership-columns") ?? {}),
  }))

  const [volunteerColumns, setVolunteerColumns] = useState(() => ({
    ...defaultVolunteerColumns,
    ...(getSavedColumns("system-volunteer-columns") ?? {}),
  }))

  const participantColumnOptions = [
    { key: "participant", label: "Participant" },
    { key: "delegation", label: "Delegation" },
    { key: "preferences", label: "Preferences" },
    { key: "assignments", label: "Assignments" },
    { key: "status", label: "Status" },
    { key: "payment", label: "Payment" },
    { key: "notes", label: "Notes" },
    { key: "created", label: "Created" },
    { key: "actions", label: "Actions" },
  ] as const

  const partnershipColumnOptions = [
    { key: "organization", label: "Organization" },
    { key: "contact", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "message", label: "Message" },
    { key: "created", label: "Created" },
  ] as const

  const volunteerColumnOptions = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "school", label: "School" },
    { key: "status", label: "Status" },
    { key: "experience", label: "Experience" },
    { key: "created", label: "Created" },
  ] as const

  const participantColumnCount = useMemo(
    () => Object.values(participantColumns).filter(Boolean).length,
    [participantColumns]
  )
  const partnershipColumnCount = useMemo(
    () => Object.values(partnershipColumns).filter(Boolean).length,
    [partnershipColumns]
  )
  const volunteerColumnCount = useMemo(
    () => Object.values(volunteerColumns).filter(Boolean).length,
    [volunteerColumns]
  )

  const totals = useMemo(() => {
    return {
      participants: participants.length,
      partnerships: partnerships.length,
      volunteers: volunteers.length,
    }
  }, [participants, partnerships, volunteers])

  const fetchAllData = async () => {
    setLoading(true)

    const [participantsRes, partnershipRes, volunteerRes] = await Promise.all([
      supabase.from("participant_registrations").select("*").order("created_at", { ascending: false }),
      supabase.from("partnership_applications").select("*").order("created_at", { ascending: false }),
      supabase.from("volunteer_signups").select("*").order("created_at", { ascending: false }),
    ])

    if (participantsRes.error) toast.error("Failed to load participant registrations")
    if (partnershipRes.error) toast.error("Failed to load partnerships")
    if (volunteerRes.error) toast.error("Failed to load volunteer signups")

    setParticipants((participantsRes.data ?? []) as ParticipantRegistration[])
    setPartnerships((partnershipRes.data ?? []) as PartnershipApplication[])
    setVolunteers((volunteerRes.data ?? []) as VolunteerSignup[])

    sessionStorage.setItem(
      "systemDashboardData",
      JSON.stringify({
        participants: participantsRes.data ?? [],
        partnerships: partnershipRes.data ?? [],
        volunteers: volunteerRes.data ?? [],
        cachedAt: new Date().toISOString(),
      })
    )

    setLoading(false)
  }

  const handleEdit = (participant: ParticipantRegistration) => {
    setEditingId(participant.id)
    setEditForm({
      assigned_country: participant.assigned_country ?? "",
      assigned_committee: participant.assigned_committee ?? "",
      status: participant.status ?? "pending",
      payment_status: participant.payment_status ?? "",
    })
  }

  const handleSave = async (id: string) => {
    const { error } = await supabase
      .from("participant_registrations")
      .update({
        assigned_country: editForm.assigned_country || null,
        assigned_committee: editForm.assigned_committee || null,
        status: editForm.status,
        payment_status: editForm.payment_status || null,
      })
      .eq("id", id)

    if (error) {
      toast.error("Failed to update participant")
      return
    }

    toast.success("Participant updated")
    setEditingId(null)
    fetchAllData()
  }

  const checkIsAdmin = async (email: string) => {
    // RLS should allow selecting ONLY own row.
    // We query system_admins for this email; if row exists, user is admin.
    const { data, error } = await supabase
      .from("system_admins")
      .select("email")
      .eq("email", email.toLowerCase())
      .maybeSingle()

    if (error) return false
    return Boolean(data?.email)
  }

  const handleAccessCheck = async () => {
    if (!sessionStorage.getItem("systemDashboardAuthorized")) {
      setLoading(true)
    }

    const { data: userData } = await supabase.auth.getUser()
    const email = userData.user?.email?.toLowerCase() ?? null

    if (!email) {
      setAuthorized(false)
      sessionStorage.removeItem("systemDashboardAuthorized")
      setUserEmail(null)
      setLoading(false)
      navigate("/system/login", { replace: true })
      return
    }

    setUserEmail(email)

    const isAdmin = await checkIsAdmin(email)

    if (!isAdmin) {
      await supabase.auth.signOut()
      setAuthorized(false)
      sessionStorage.removeItem("systemDashboardAuthorized")
      setLoading(false)
      return
    }

    setAuthorized(true)
    sessionStorage.setItem("systemDashboardAuthorized", "true")
    const cached = getCachedData()
    if (cached) {
      setParticipants(cached.participants ?? [])
      setPartnerships(cached.partnerships ?? [])
      setVolunteers(cached.volunteers ?? [])
      setLoading(false)
      return
    }
    await fetchAllData()
  }

  useEffect(() => {
    void handleAccessCheck()

    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "INITIAL_SESSION") return
      void handleAccessCheck()
    })

    return () => {
      data.subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setColumnsCookie("system-participant-columns", participantColumns)
  }, [participantColumns])

  useEffect(() => {
    setColumnsCookie("system-partnership-columns", partnershipColumns)
  }, [partnershipColumns])

  useEffect(() => {
    setColumnsCookie("system-volunteer-columns", volunteerColumns)
  }, [volunteerColumns])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setAuthorized(false)
    sessionStorage.removeItem("systemDashboardAuthorized")
    setUserEmail(null)
    navigate("/system/login", { replace: true })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div
          className="bg-card border border-border rounded-xl p-8 max-w-lg"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Unauthorized access</h1>
              <p className="text-sm text-muted-foreground">
                {userEmail || "Your account"} is not approved for system access.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Please contact the MWEF team to request access.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-semibold text-foreground">System Console</h1>
              <p className="text-xs text-muted-foreground">Signed in as {userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-secondary transition-colors"
            >
              <RefreshCcw size={16} />
              Refresh
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-10 space-y-10">
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Participants", value: totals.participants, icon: Users },
            { label: "Partnerships", value: totals.partnerships, icon: Building2 },
            { label: "Volunteers", value: totals.volunteers, icon: UserCheck },
          ].map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <card.icon className="text-accent" size={22} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-semibold text-foreground">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Database size={20} className="text-accent" />
              Participant Registrations
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Scroll →</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-secondary transition-colors">
                    Columns
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {participantColumnOptions.map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.key}
                      checked={participantColumns[column.key]}
                      onCheckedChange={(checked) =>
                        setParticipantColumns((prev) => ({ ...prev, [column.key]: Boolean(checked) }))
                      }
                    >
                      {column.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div
            className="bg-card border border-border rounded-xl overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-max">
                <thead className="bg-secondary">
                  <tr className="text-left">
                    {participantColumns.participant && (
                      <th className="px-4 py-3 font-medium text-foreground">Participant</th>
                    )}
                    {participantColumns.delegation && (
                      <th className="px-4 py-3 font-medium text-foreground">Delegation</th>
                    )}
                    {participantColumns.preferences && (
                      <th className="px-4 py-3 font-medium text-foreground">Preferences</th>
                    )}
                    {participantColumns.assignments && (
                      <th className="px-4 py-3 font-medium text-foreground">Assignments</th>
                    )}
                    {participantColumns.status && (
                      <th className="px-4 py-3 font-medium text-foreground">Status</th>
                    )}
                    {participantColumns.payment && (
                      <th className="px-4 py-3 font-medium text-foreground">Payment</th>
                    )}
                    {participantColumns.notes && (
                      <th className="px-4 py-3 font-medium text-foreground">Notes</th>
                    )}
                    {participantColumns.created && (
                      <th className="px-4 py-3 font-medium text-foreground">Created</th>
                    )}
                    {participantColumns.actions && (
                      <th className="px-4 py-3 font-medium text-foreground">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {participants.length === 0 ? (
                    <tr>
                      <td
                        colSpan={participantColumnCount}
                        className="px-4 py-6 text-center text-sm text-muted-foreground"
                      >
                        No participant registrations found.
                      </td>
                    </tr>
                  ) : (
                    participants.map((participant) => (
                      <tr key={participant.id} className="hover:bg-secondary/50">
                        {participantColumns.participant && (
                          <td className="px-4 py-3">
                            <p className="font-medium text-foreground">
                              {participant.first_name} {participant.last_name}
                            </p>
                            <p className="text-xs text-muted-foreground">{participant.email}</p>
                          </td>
                        )}
                        {participantColumns.delegation && (
                          <td className="px-4 py-3">
                            <p className="capitalize text-foreground">{participant.delegation_type}</p>
                          </td>
                        )}
                        {participantColumns.preferences && (
                          <td className="px-4 py-3">
                            <p className="text-foreground">
                              {participant.delegation_type === "country"
                                ? participant.preferred_country
                                : participant.preferred_institution}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Committee: {participant.committee_preference || "Any"}
                            </p>
                          </td>
                        )}
                        {participantColumns.assignments && (
                          <td className="px-4 py-3">
                            {editingId === participant.id ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Flag size={16} className="text-accent" />
                                  <input
                                    type="text"
                                    list="country-options"
                                    value={editForm.assigned_country}
                                    onChange={(event) =>
                                      setEditForm({
                                        ...editForm,
                                        assigned_country: event.target.value,
                                      })
                                    }
                                    className="form-input text-sm"
                                    placeholder="Assigned country"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Flag size={16} className="text-accent" />
                                  <input
                                    type="text"
                                    list="committee-options"
                                    value={editForm.assigned_committee}
                                    onChange={(event) =>
                                      setEditForm({
                                        ...editForm,
                                        assigned_committee: event.target.value,
                                      })
                                    }
                                    className="form-input text-sm"
                                    placeholder="Assigned committee"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="text-foreground">
                                  Country: {participant.assigned_country || "Unassigned"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Committee: {participant.assigned_committee || "Unassigned"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Institution: {participant.assigned_institution || "N/A"}
                                </p>
                              </div>
                            )}
                          </td>
                        )}
                        {participantColumns.status && (
                          <td className="px-4 py-3">
                            {editingId === participant.id ? (
                              <select
                                className="form-input text-sm"
                                value={editForm.status}
                                onChange={(event) =>
                                  setEditForm({ ...editForm, status: event.target.value })
                                }
                              >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="waitlist">Waitlist</option>
                              </select>
                            ) : (
                              <span className="text-foreground capitalize">{participant.status}</span>
                            )}
                          </td>
                        )}
                        {participantColumns.payment && (
                          <td className="px-4 py-3 capitalize text-foreground">
                            {editingId === participant.id ? (
                              <select
                                className="form-input text-sm capitalize"
                                value={editForm.payment_status}
                                onChange={(event) =>
                                  setEditForm({
                                    ...editForm,
                                    payment_status: event.target.value,
                                  })
                                }
                              >
                                <option value="">Select payment</option>
                                <option value="paid">Paid</option>
                                <option value="unpaid">Unpaid</option>
                              </select>
                            ) : (
                              participant.payment_status || "n/a"
                            )}
                          </td>
                        )}
                        {participantColumns.notes && (
                          <td className="px-4 py-3 text-muted-foreground">
                            {participant.notes || "-"}
                          </td>
                        )}
                        {participantColumns.created && (
                          <td className="px-4 py-3 text-muted-foreground">
                            {new Date(participant.created_at).toLocaleDateString()}
                          </td>
                        )}
                        {participantColumns.actions && (
                          <td className="px-4 py-3">
                            {editingId === participant.id ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleSave(participant.id)}
                                  className="p-1 rounded-md text-accent hover:bg-accent/10"
                                >
                                  <Check size={18} />
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="p-1 rounded-md text-destructive hover:bg-destructive/10"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleEdit(participant)}
                                className="p-1 rounded-md text-accent hover:bg-accent/10"
                              >
                                <Pencil size={18} />
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <datalist id="country-options">
              {allCountries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
            <datalist id="committee-options">
              {committees.map((committee) => (
                <option
                  key={committee.id}
                  value={committee.abbreviation}
                >{`${committee.name} (${committee.abbreviation})`}</option>
              ))}
            </datalist>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Building2 className="text-accent" size={20} />
              Partnership Applications
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Scroll →</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-secondary transition-colors">
                    Columns
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {partnershipColumnOptions.map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.key}
                      checked={partnershipColumns[column.key]}
                      onCheckedChange={(checked) =>
                        setPartnershipColumns((prev) => ({
                          ...prev,
                          [column.key]: Boolean(checked),
                        }))
                      }
                    >
                      {column.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div
            className="bg-card border border-border rounded-xl overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-max">
                <thead className="bg-secondary">
                  <tr className="text-left">
                    {partnershipColumns.organization && (
                      <th className="px-4 py-3 font-medium text-foreground">Organization</th>
                    )}
                    {partnershipColumns.contact && (
                      <th className="px-4 py-3 font-medium text-foreground">Contact</th>
                    )}
                    {partnershipColumns.email && (
                      <th className="px-4 py-3 font-medium text-foreground">Email</th>
                    )}
                    {partnershipColumns.type && (
                      <th className="px-4 py-3 font-medium text-foreground">Type</th>
                    )}
                    {partnershipColumns.status && (
                      <th className="px-4 py-3 font-medium text-foreground">Status</th>
                    )}
                    {partnershipColumns.message && (
                      <th className="px-4 py-3 font-medium text-foreground">Message</th>
                    )}
                    {partnershipColumns.created && (
                      <th className="px-4 py-3 font-medium text-foreground">Created</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {partnerships.length === 0 ? (
                    <tr>
                      <td
                        colSpan={partnershipColumnCount}
                        className="px-4 py-6 text-center text-sm text-muted-foreground"
                      >
                        No partnership applications yet.
                      </td>
                    </tr>
                  ) : (
                    partnerships.map((partner) => (
                      <tr key={partner.id} className="hover:bg-secondary/50">
                        {partnershipColumns.organization && (
                          <td className="px-4 py-3 text-foreground">
                            {partner.organization_name}
                          </td>
                        )}
                        {partnershipColumns.contact && (
                          <td className="px-4 py-3 text-foreground">
                            {partner.contact_person}
                          </td>
                        )}
                        {partnershipColumns.email && (
                          <td className="px-4 py-3 text-muted-foreground">{partner.email}</td>
                        )}
                        {partnershipColumns.type && (
                          <td className="px-4 py-3 text-foreground capitalize">
                            {partner.partnership_type}
                          </td>
                        )}
                        {partnershipColumns.status && (
                          <td className="px-4 py-3 text-foreground capitalize">
                            {partner.status}
                          </td>
                        )}
                        {partnershipColumns.message && (
                          <td className="px-4 py-3 text-muted-foreground">
                            {partner.message || "-"}
                          </td>
                        )}
                        {partnershipColumns.created && (
                          <td className="px-4 py-3 text-muted-foreground">
                            {new Date(partner.created_at).toLocaleDateString()}
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <UserCheck className="text-accent" size={20} />
              Volunteer Signups
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Scroll →</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-border hover:bg-secondary transition-colors">
                    Columns
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {volunteerColumnOptions.map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.key}
                      checked={volunteerColumns[column.key]}
                      onCheckedChange={(checked) =>
                        setVolunteerColumns((prev) => ({
                          ...prev,
                          [column.key]: Boolean(checked),
                        }))
                      }
                    >
                      {column.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div
            className="bg-card border border-border rounded-xl overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-max">
                <thead className="bg-secondary">
                  <tr className="text-left">
                    {volunteerColumns.name && (
                      <th className="px-4 py-3 font-medium text-foreground">Name</th>
                    )}
                    {volunteerColumns.email && (
                      <th className="px-4 py-3 font-medium text-foreground">Email</th>
                    )}
                    {volunteerColumns.role && (
                      <th className="px-4 py-3 font-medium text-foreground">Role</th>
                    )}
                    {volunteerColumns.school && (
                      <th className="px-4 py-3 font-medium text-foreground">School</th>
                    )}
                    {volunteerColumns.status && (
                      <th className="px-4 py-3 font-medium text-foreground">Status</th>
                    )}
                    {volunteerColumns.experience && (
                      <th className="px-4 py-3 font-medium text-foreground">Experience</th>
                    )}
                    {volunteerColumns.created && (
                      <th className="px-4 py-3 font-medium text-foreground">Created</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {volunteers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={volunteerColumnCount}
                        className="px-4 py-6 text-center text-sm text-muted-foreground"
                      >
                        No volunteer signups yet.
                      </td>
                    </tr>
                  ) : (
                    volunteers.map((volunteer) => (
                      <tr key={volunteer.id} className="hover:bg-secondary/50">
                        {volunteerColumns.name && (
                          <td className="px-4 py-3 text-foreground">{volunteer.full_name}</td>
                        )}
                        {volunteerColumns.email && (
                          <td className="px-4 py-3 text-muted-foreground">{volunteer.email}</td>
                        )}
                        {volunteerColumns.role && (
                          <td className="px-4 py-3 text-foreground">
                            {volunteer.preferred_role}
                          </td>
                        )}
                        {volunteerColumns.school && (
                          <td className="px-4 py-3 text-foreground">{volunteer.school}</td>
                        )}
                        {volunteerColumns.status && (
                          <td className="px-4 py-3 text-foreground capitalize">
                            {volunteer.status}
                          </td>
                        )}
                        {volunteerColumns.experience && (
                          <td className="px-4 py-3 text-muted-foreground">
                            {volunteer.experience || "-"}
                          </td>
                        )}
                        {volunteerColumns.created && (
                          <td className="px-4 py-3 text-muted-foreground">
                            {new Date(volunteer.created_at).toLocaleDateString()}
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SystemDashboard
